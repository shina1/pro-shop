import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import {notFound, errorHandler} from './middleware/errMiddleware.js'
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoute.js';


dotenv.config();

const app = express();
// this will allow us to recieve json data in the body of our requests
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes)

connectDB();
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(notFound)
app.use(errorHandler)

// const PORT = 5700;

// app.listen(PORT, console.log(`server running in  mode on port ${PORT}`));
const PORT = process.env.PORT || 5700;

app.listen(
  PORT,
  console.log(
    `server running in ${[process.env.NODE_ENV]} mode on port ${PORT}`.green
      .bold
  )
);
