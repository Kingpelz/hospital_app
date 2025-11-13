const error = (err, req, res, next) => {
//   console.log("got here from error handler", err);
//   console.log("simple Error", err.message);
  console.log("stack trace", err.stack);

  return res.status(500).json({
    error: "Internal Server Error. please check the log for details",
  });
};

module.exports = error;