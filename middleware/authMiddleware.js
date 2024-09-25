const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.validateRegistration = [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').isEmail().withMessage('Must be a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await Users.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

exports.rbac = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const userRoles = await req.user.getRoles();
      const hasPermission = userRoles.some(role => allowedRoles.includes(role.name));
      if (!hasPermission) {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: 'Error checking permissions' });
    }
  };
};
