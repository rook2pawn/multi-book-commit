const argv = require("minimist")(process.argv.slice(2));
const port = argv.p;

const API_BE = "http://127.0.0.1:5150";
const SPA_FE = "http://localhost:5050";

const http = require("http"),
  httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer();
const server = http.createServer(function (req, res) {
  if (req.url.indexOf("/api/") > -1) {
    req.url = req.url.slice(4);
    proxy.web(req, res, { target: API_BE });
  } else {
    proxy.web(req, res, { target: SPA_FE });
  }
});

server.listen(port, () => {
  console.log(`Proxy listening on ${port}. Click http://localhost:${port}`);
  console.log(`Routing /api to ${API_BE}`);
  console.log(`Routing everything else to SPA server on ${SPA_FE}`);
});

process.on("SIGINT", function () {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  // some other closing procedures go here
  console.log("Closing server");
  server.close(() => {
    console.log("Server closed. Process now exiting");
    process.exit(0);
  });
});
