import React, { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// Components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

function Home() {
  // Using global context
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('/api/workouts');
        const data = await response.json(); // Parse the response

        console.log("Fetched data:", data);

        if (response.ok && Array.isArray(data.data)) {
          dispatch({ type: 'SET_WORKOUTS', payload: data.data });
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error in fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, [dispatch]); // Dependency array includes dispatch

  return (
    <div className="home">
      <div className="workouts">
        {Array.isArray(workouts) && workouts.length > 0 ? (
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))
        ) : (
          <p>No workouts available. Add one to get started!</p>
        )}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
