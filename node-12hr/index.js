require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const path = require("path");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
console.log("env", process.env.PASSWORD);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecom");
  console.log("DB Connected");
}

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
app.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
app.use("/products", productRouter.router);
app.use("/users", userRouter.router);
app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log("Running");
});
