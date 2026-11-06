const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      // This should ideally not happen if authMiddleware runs first
      return res.status(401).json({ message: 'Authentication required' });
    }

    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: `Forbidden: Role '${userRole}' is not authorized to access this resource.`,
      });
    }

    next(); // User has the required role, proceed
  };
};

module.exports = authorizeRoles; 