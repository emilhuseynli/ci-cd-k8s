module.exports = function(req, res, next) {
  res.contentType = "json";
  res.send({ status: "ALIVE" });
  next();
};
