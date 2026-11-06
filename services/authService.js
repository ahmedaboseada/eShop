const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const authObserver = require('../observers/authObserver');

class AuthService {
  async signup({ firstName, lastName, email, password, role }) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email already in use');
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      firstName,
      lastName,
      email,
      passwordHash,
      role: role || 'customer',
    });
    authObserver.emit('userSignedUp', { userId: user._id, email });
    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);
    return {
      user: { id: user._id, email, role: user.role },
      accessToken,
      refreshToken,
    };
  }

  async signin({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }
    authObserver.emit('userSignedIn', { userId: user._id, email });
    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);
    return {
      user: { id: user._id, email, role: user.role },
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
      if (!decoded.id) {
        throw new Error('Invalid refresh token');
      }
      const storedToken = await RefreshToken.findOne({ token: refreshToken, user: decoded.id });
      if (!storedToken || storedToken.expiresAt < new Date()) {
        throw new Error('Refresh token expired or invalid');
      }
      const user = await User.findById(decoded.id);
      if (!user) {
        throw new Error('User not found');
      }
      const newAccessToken = this.generateAccessToken(user);
      await RefreshToken.deleteOne({ token: refreshToken });
      const newRefreshToken = await this.generateRefreshToken(user);
      authObserver.emit('tokenRefreshed', { userId: user._id, email: user.email });
      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user: { id: user._id, email: user.email, role: user.role },
      };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  generateAccessToken(user) {
    return jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  }

  async generateRefreshToken(user) {
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );
    await RefreshToken.create({
      user: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return refreshToken;
  }

  async revokeRefreshToken(refreshToken) {
    await RefreshToken.deleteOne({ token: refreshToken });
  }
}

module.exports = new AuthService();