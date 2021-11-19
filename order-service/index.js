const grcp = require("@grpc/grpc-js");

const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("./order.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const orderProto = grcp.loadPackageDefinition(packageDefinition).orderservice;

function PlaceOrder(order, callback) {
  console.log("Received order:", order.request);
  callback(null, {
    ...order.request,
    orderId: Math.floor(Math.random() * 1000000),
  });
}

function main() {
  const server = new grcp.Server();
  server.addService(orderProto.OrderService.service, { PlaceOrder });
  server.bindAsync(
    "0.0.0.0:50051",
    grcp.ServerCredentials.createInsecure(),
    (err, port) => {
      server.start();
      console.log(`Server started, listening on 0.0.0.0:50051`);
    }
  );
}

main();
