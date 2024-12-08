import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import workoutRoutes from "./routes/workouts.js";

dotenv.config();

//express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(PORT, () => {
      console.log("Connected to db & listening on port", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

const PORT = process.env.PORT;
