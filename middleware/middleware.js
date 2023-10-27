const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');
const response = require('../utils/response.helper');

const Admin = db.admin;

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  console.log("token: ", token);

  if (token === null || token === undefined) {
    console.log("No token Provided!");
    return response.responseHelper(res, 403, null, 'No token provided!', false);
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return response.responseHelper(res, 401, null, 'Unauthorized!', false);
    }
    req.userId = decoded.id;
    console.log("token verified:", req.userId);
    next();
  });
};

const verifyUser = async (req, res, next) => {
  try {
    const user = await db.user.findOne({
      where: {
        id: req.userId,
      },
    });
    if (!user) throw 'User not found';
    req.user = user;
    console.log("User verified");
    console.log(req.user.email);
    next();
  } catch (err) {
    return response.responseHelper(res, 403, err, 'Authentication failed', false);
  }
}

const verifyAdmin = async (req, res, next) => {
  try {
    console.log("Reached verify admin:", req.userId);
    const user = await db.user.findOne({
      where: {
        id: req.userId,
      },
    });
    if (!user) throw 'User not found';
    if (user.isAdmin !== true) throw 'User is not an admin';
    req.user = user;
    console.log("User verified");
    console.log(req.user.email);
    next();
  } catch (err) {
    return response.responseHelper(res, 403, err, 'Authentication failed', false);
  }
}

const verifyTokenOptional = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return response.responseHelper(res, 401, null, 'Unauthorized!', false);
      }
      req.userId = decoded.id;
    });
  } else {
    req.userId = null;
  }
  next();
};

const authJwt = {
  verifyToken,
  verifyUser,
  verifyTokenOptional,
  verifyAdmin,
};

module.exports = authJwt;
