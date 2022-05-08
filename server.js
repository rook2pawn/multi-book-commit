const argv = require("minimist")(process.argv.slice(2));
const port = argv.p;

const http = require("http");
const router = require("router-middleware");
const cookieParser = require("cookie-parser");

const { CORS, parseJwt } = require("./server/lib");
const { v4 } = require("uuid");

const app = router();
const server = http.createServer(app);
app.use(cookieParser());
app.options("/user/create", function (req, res) {
  const corsHeaders = CORS({ req });
  res.writeHead(200, { ...corsHeaders });
  res.end();
});
app.post("/user/create", router.bodyParser, async function (req, res) {
  const text = JSON.stringify({
    action: "user/create",
    payload: { result: "ok" },
  });
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": req.headers.origin,
    "Content-Length": text.length,
  });
  res.end(text);
});

server.listen(port, () => {
  console.log(`backend server listening on ${port}`);
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
