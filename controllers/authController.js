const authService = require('../services/authService');

class AuthController {
  async signup(req, res, next) {
    try {
      const { firstName, lastName, email, password, role } = req.body;
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      const result = await authService.signup({ firstName, lastName, email, password, role });
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(201).json({
        message: 'User created successfully',
        user: result.user,
        accessToken: result.accessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      const result = await authService.signin({ email, password });
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        message: 'Sign-in successful',
        user: result.user,
        accessToken: result.accessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const refreshToken = req.body.refreshToken || req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
      }
      const result = await authService.refreshToken(refreshToken);
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        message: 'Token refreshed successfully',
        accessToken: result.accessToken,
        user: result.user,
      });
    } catch (error) {
      return res.status(401).json({ message: error.message || 'Invalid refresh token' });
    }
  }
}

module.exports = new AuthController();