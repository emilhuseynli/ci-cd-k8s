var restify = require("restify");
var server = restify.createServer();
var pkg = require("../package.json");
var rootResponder = require("./routes/root");
var sysinfoResponder = require("./routes/sysinfo");

server.get("/", rootResponder);
server.get("/sysinfo", sysinfoResponder);

server.listen(3000, function() {
  console.log("restifyjs version %s running on port 3000", pkg.version);
  setInterval(function() {
    console.log("restifyjs version %s running on port 3000", pkg.version);
  }, 10000);
});
