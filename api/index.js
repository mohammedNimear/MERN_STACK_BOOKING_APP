// import express to create app & server ====> on terminal npm install express
import express from "express";
// import dotenv to hide uri & jwt key =====> on terminal npm install dotenv
import dotenv from "dotenv";
// import mongoose to connect uri to server & create schema& model ====> on terminal npm install mongoose
import mongoose from "mongoose";
// import cookieParser to encode sended token ====> on terminal npm install cookie-parser
import cookieParser from "cookie-parser";
// import cors ===> npm install cors
import cors from "cors";

// import Routers
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

// create app
const app = express();
// activate dotenv
dotenv.config();

//* LOCAL_MONGO || CLOUD_MONGO

// create connections
const connect = async () => {
  try {
    await mongoose.connect(process.env.LOCAL_MONGO);
    console.log("connected to mongo_db successfully!");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log(`sorry mongodb disconnected ):`);
});

//! middlewares

// using json in app
app.use(express.json());
// using cors app
app.use(cors());
// using cookieParser in app
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";
  return res.status(errorStatus).json({
    success: false,
    error: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const port = process.env.PORT || 9000;

// listen to server
app.listen(port, () => {
  connect();
  console.log(`listen to backend server on port ${port}`);
});
