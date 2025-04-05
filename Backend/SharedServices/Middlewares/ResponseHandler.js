const responsehandler = (req, res, next) => {
  res.success = (message, data, statusCode = 200) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
      statusCode,
      timestamp: new Date().toISOString(),
    });
  };
  res.error = (message, statusCode = 500, data = null) => {
    res.status(statusCode).json({
      success: false,
      message,
      data,
      statusCode,
      timestamp: new Date().toISOString(),
    });
  };

  next();
};

module.exports = responsehandler;
