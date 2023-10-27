exports.responseHelper = (res, statusCode, data, message, success = true) => {
    const response = {
        status: success ? 'success' : 'error',
        code: statusCode,
        data,
        message,
    };

    res.status(statusCode).json(response);
}
