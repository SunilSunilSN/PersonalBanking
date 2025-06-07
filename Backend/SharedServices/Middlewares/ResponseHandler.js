const responsehandler = (req, res, next) => {
  const {WorkFlowId, Step } = req.body;
  res.success = (message, data, statusCode = 200) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
      statusCode,
      WorkFlowId,
      Step,
      timestamp: new Date().toISOString(),
    });
  };
  res.error = (message, statusCode = 500, data = null) => {
    res.status(statusCode).json({
      success: false,
      message,
      data,
      statusCode,
      WorkFlowId,
      Step,
      timestamp: new Date().toISOString(),
    });
  };

  next();
};

module.exports = responsehandler;
