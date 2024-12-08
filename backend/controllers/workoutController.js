import Workout from "../models/workout.js";
import mongoose from "mongoose";

export const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: workouts });
  } catch (error) {
    console.error("Error in fetching workouts", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createWorkout = async (req, res) => {
  const workout = req.body;

  if (!workout.title || !workout.reps || !workout.load) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newWorkout = new Workout(workout);

  try {
    await newWorkout.save();
    res.status(201).json({
      success: true,
      message: "Workout Created successfully",
      data: newWorkout,
    });
  } catch (error) {
    console.error("Error creating in workout:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "No such workout" });
  }

  try {
    const workout = await Workout.findByIdAndDelete(id);

    if (!workout) {
      return res
        .status(404)
        .json({ success: false, message: "Workout not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Workout deleted successfully!" });
  } catch (error) {
    console.error("Error in deleting workout", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const workout = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "No such workout" });
  }

  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(id, workout, {
      new: true,
    });

    res.status(200).json({success: true, message: "Workout updated successfully!", data: updatedWorkout})
  } catch (error) {
    console.error("Error in updating workout", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getWorkout = async (req, res) => {
  //destructuring
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "No such workout" });
  }

  try {
    const workout = await Workout.findById(id);

    if (!workout) {
      return res
        .status(404)
        .json({ success: false, message: "Workout not found" });
    }
    res.status(200).json({ success: true, data: workout });
  } catch (error) {
    console.error("Error in fetching workout", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
