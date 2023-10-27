const jwt = require("jsonwebtoken");
const db = require("../models");
const config = require("../config/auth.config");
const response = require("../utils/response.helper");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

exports.signUpUser = async (req, res) => {
  const { email, user_name, password } = req.body;
  try {
    if (!user_name) {
      return response.responseHelper(
        res,
        400, // Use the appropriate status code for bad request
        null,
        "Username not provided",
        false
      );
    }
    if (!password) {
      return response.responseHelper(
        res,
        400, // Use the appropriate status code for bad request
        null,
        "Password not provided",
        false
      );
    }
    if (!email) {
      return response.responseHelper(
        res,
        400, // Use the appropriate status code for bad request
        null,
        "Email not provided",
        false
      );
    }

    const validateUser = await db.user.findOne({
      where: {
        email: email,
        is_deleted: false,
      },
    });

    if (validateUser && validateUser.email === email) {
      return response.responseHelper(
        res,
        409, // Use the appropriate status code for conflict
        null,
        "Email is already in use",
        false
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await db.user.create({
      email: email,
      user_name: user_name,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: createUser.id,
        email: createUser.email,
        password: createUser.password,
      },
      config.secret,
      {
        expiresIn: 172800, // expiry time 1 day
      }
    );

    return response.responseHelper(
      res,
      201, // Use the appropriate status code for resource created
      { createUser: createUser, access_token: token },
      "User added successfully"
    );
  } catch (error) {
    console.log(error);
    return response.responseHelper(
      res,
      500, // Use the appropriate status code for internal server error
      null,
      "Failed to signup user",
      false
    );
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      return response.responseHelper(
        res,
        400, // Use the appropriate status code for bad request
        null,
        "Email not provided",
        false
      );
    }
    if (!password) {
      return response.responseHelper(
        res,
        400, // Use the appropriate status code for bad request
        null,
        "Password not provided",
        false
      );
    }

    let userProfile = await db.user.findOne({
      where: {
        email: email,
      },
    });

    if (!userProfile) {
      return response.responseHelper(
        res,
        404, // Use the appropriate status code for not found
        null,
        "User not found",
        false
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      userProfile.password
    );

    if (!isPasswordValid) {
      return response.responseHelper(
        res,
        401, // Use the appropriate status code for unauthorized
        null,
        "Password is wrong",
        false
      );
    }

    const token = jwt.sign(
      {
        id: userProfile.id,
        password: userProfile.password,
        email: userProfile.email,
      },
      config.secret,
      {
        expiresIn: 172800, // expiry time 1 day
      }
    );

    return response.responseHelper(
      res,
      200, // Use the appropriate status code for success
      {
        id: userProfile.id,
        email: userProfile.email, // Remove the extra space
        isAdmin: userProfile.isAdmin,
        access_token: token,
      },
      "Login success"
    );
  } catch (error) {
    console.log(error);
    return response.responseHelper(
      res,
      500, // Use the appropriate status code for internal server error
      null,
      "Failed to login",
      false
    );
  }
};
