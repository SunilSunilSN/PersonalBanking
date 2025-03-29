const ErrorHandler = (err, req, res, next) => {
    console.log("Error:,", err);
    const statusCode = res.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Something Went Wrong, Please try again",
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack, // Hide stack trace in production
      });
};


module.exports = ErrorHandler;