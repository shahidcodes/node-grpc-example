# Basic GRPC Example using Node.js

---

`main`  
this is main service of our application and will be calling other grpc server. This runs express

`order-service`
this is our second service. This will be responsive for handling orders in our application. Responsibilities includes - create order, get an order, get status of an other, update status of an order etc

`user-service`
this is our authentication and user management service. This will be used to authenticate api requests, handle user informations etc
