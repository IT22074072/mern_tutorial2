import express from "express";
import Workout from "../models/workout.js";
import {
  createWorkout,
  deleteWorkout,
  getAllWorkouts,
  getWorkout,
  updateWorkout,
} from "../controllers/workoutController.js";

const router = express.Router();

router.get("/", getAllWorkouts);
router.post("/", createWorkout);
router.put("/:id", updateWorkout);
router.delete("/:id", deleteWorkout);
router.get("/:id", getWorkout);

export default router;
