const { userService } = require("./grpcClient");

function authMiddleware(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send({
      error: "No token provided",
    });
  }

  userService.Authenticate(
    {
      authToken: token,
    },
    (err, response) => {
      console.log(err);
      console.log(response);
      if (err) {
        return res.status(401).send(err);
      }

      req.user = response;
      next();
    }
  );
}

module.exports = authMiddleware;
