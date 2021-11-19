const express = require("express");
const authMiddleware = require("./authMiddleware");
const { orderService } = require("./grpcClient");

const app = express();

app.use(express.json());

function main() {
  // routes
  app.use(authMiddleware);
  app.post("/order", (req, res) => {
    orderService.PlaceOrder(req.body, (err, response) => {
      if (err) {
        console.log(err);
        return res.send({ error: 1 });
      }
      console.log(response);
      res.send(response);
    });
  });

  app.listen(3000);
  console.log("server started at :3000");
}

main();
