const CORS = ({ req }) => {
  return {
    "Access-Control-Allow-Origin": req.headers.origin,
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };
};
exports.CORS = CORS;

//https://stackoverflow.com/questions/52863051/decode-jwt-token-in-node-without-library

const parseJwt = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const buff = Buffer.from(base64, "base64");
  const payloadinit = buff.toString("ascii");
  const payload = JSON.parse(payloadinit);
  return payload;
};
exports.parseJwt = parseJwt;
