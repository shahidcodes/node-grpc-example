const grcp = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("../order-service/order.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const orderProto = grcp.loadPackageDefinition(packageDefinition).orderservice;

const orderService = new orderProto.OrderService(
  "localhost:50051",
  grcp.credentials.createInsecure()
);

const packageDefinitionUser = protoLoader.loadSync(
  "../user-service/user.proto",
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

const userProto = grcp.loadPackageDefinition(packageDefinitionUser).userservice;

const userService = new userProto.UserService(
  "localhost:50052",
  grcp.credentials.createInsecure()
);

module.exports = { orderService, userService };
