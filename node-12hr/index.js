require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
console.log(process.env.PASSWORD);

app.use(express.json());
app.use(morgan("combined"));
app.use(express.static(process.env.PUBLIC_DIR));
app.use("/products", productRouter.router);
app.use("/users", userRouter.router);

app.listen(process.env.PORT, () => {
  console.log(`Running in port ${process.env.PORT}`);
});
