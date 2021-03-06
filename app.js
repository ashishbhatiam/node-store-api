const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const connectDB = require("./db/connect");
const port = process.env.PORT || 5001;

const productRoutes = require("./routes/products");

// express body parser
app.use(express.json());

app.use("/api/v1/products", productRoutes);

// middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// connectDB
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server listening on http://localhost:${port}/`);
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

start();
