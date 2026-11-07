const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');

function publicUser(user) {
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  };
}

function signAccessToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );
}

async function createRefreshToken(user) {
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_TOKEN_SECRET || process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '7d' }
  );
  await RefreshToken.create({
    user: user._id,
    token,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  return token;
}

function setRefreshCookie(res, token) {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

async function signup(req, res, next) {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email already in use' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      passwordHash,
    });
    const accessToken = signAccessToken(user);
    const refreshToken = await createRefreshToken(user);
    setRefreshCookie(res, refreshToken);
    return res.status(201).json({
      success: true,
      data: { user: publicUser(user), accessToken },
    });
  } catch (error) {
    next(error);
  }
}

async function signin(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    const user = await User.findOne({ email: email.toLowerCase() }).select('+passwordHash');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    const accessToken = signAccessToken(user);
    const refreshToken = await createRefreshToken(user);
    setRefreshCookie(res, refreshToken);
    return res.json({
      success: true,
      data: { user: publicUser(user), accessToken },
    });
  } catch (error) {
    next(error);
  }
}

async function me(req, res) {
  return res.json({ success: true, data: publicUser(req.user) });
}

async function signout(req, res, next) {
  try {
    const token = req.cookies.refreshToken || req.body.refreshToken;
    if (token) {
      await RefreshToken.deleteOne({ token });
    }
    res.clearCookie('refreshToken');
    return res.json({ success: true, data: { message: 'Signed out' } });
  } catch (error) {
    next(error);
  }
}

module.exports = { signup, signin, me, signout };
