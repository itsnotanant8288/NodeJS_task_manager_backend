const jwt = require("jsonwebtoken");
const db = require("../models");
const config = require("../config/auth.config");
const response = require("../utils/response.helper");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

exports.addTask = async (req, res) => {
  const { des } = req.body;
  try {
    const task = await db.task.create({
      user_id: req.userId,
      description: des,
    });

    return response.responseHelper(res, 201, task, "Task added successfully");
  } catch (error) {
    console.log(error);
    return response.responseHelper(
      res,
      500, // Use the appropriate status code for internal server error
      null,
      "Failed to add task",
      false
    );
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.body;

    const task = await db.task.findOne({
      where: {
        id: id,
        is_deleted: false,
      },
    });

    if (!task) {
      return response.responseHelper(
        res,
        404, // Use the appropriate status code for not found
        null,
        "Task not found",
        false
      );
    }

    await task.update({ is_deleted: true });

    return response.responseHelper(
      res,
      200, // Use the appropriate status code for success
      task,
      "Task deleted successfully"
    );
  } catch (error) {
    return response.responseHelper(
      res,
      500, // Use the appropriate status code for internal server error
      null,
      "Something went wrong",
      false
    );
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id, des } = req.body;

    const task = await db.task.findOne({
      where: { id: id, is_deleted: false },
    });

    if (!task) {
      return response.responseHelper(
        res,
        404, // Use the appropriate status code for not found
        null,
        "Task not found",
        false
      );
    }

    await task.update({ description: des });

    return response.responseHelper(
      res,
      200, // Use the appropriate status code for success
      task,
      "Task updated successfully"
    );
  } catch (error) {
    return response.responseHelper(
      res,
      500, // Use the appropriate status code for internal server error
      null,
      "Something went wrong",
      false
    );
  }
};

exports.readTask = async (req, res) => {
  try {
    const { id } = req.query;

    const task = await db.task.findOne({
      where: {
        id: id,
        is_deleted: false,
      },
    });

    if (!task) {
      return response.responseHelper(
        res,
        404, // Use the appropriate status code for not found
        null,
        "Task not found",
        false
      );
    }

    return response.responseHelper(
      res,
      200, // Use the appropriate status code for success
      task,
      "Task read successfully"
    );
  } catch (error) {
    return response.responseHelper(
      res,
      500, // Use the appropriate status code for internal server error
      null,
      "Something went wrong",
      false
    );
  }
};

exports.getAllTask = async (req, res) => {
  try {
    console.log("id:", req.userId);
    const task = await db.task.findAll({
      where: {
        user_id: req.userId,
        is_deleted: false,
      },
    });

    return response.responseHelper(
      res,
      200, // Use the appropriate status code for success
      task,
      "All tasks displayed successfully"
    );

  } catch (error) {
    return response.responseHelper(
      res,
      500, // Use the appropriate status code for internal server error
      null,
      "Something went wrong",
      false
    );
  }
};
