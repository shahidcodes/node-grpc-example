const grcp = require("@grpc/grpc-js");

const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("../proto/user.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userProto = grcp.loadPackageDefinition(packageDefinition).userservice;

function Authenticate(authRequest, callback) {
  console.log("Received order:", authRequest.request);
  const req = authRequest.request;

  if (req.authToken === "12345") {
    callback(null, {
      userId: 1,
      name: "Shahid",
    });
  } else {
    callback({
      code: grcp.status.PERMISSION_DENIED,
      details: "Invalid auth token",
    });
  }
}

function main() {
  const server = new grcp.Server();
  server.addService(userProto.UserService.service, { Authenticate });
  server.bindAsync(
    "0.0.0.0:50052",
    grcp.ServerCredentials.createInsecure(),
    (err, port) => {
      server.start();
      console.log(`Server started, listening on 0.0.0.0:50052`);
    }
  );
}

main();
