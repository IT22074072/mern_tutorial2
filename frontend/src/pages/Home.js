import React from "react";
import { useEffect, useState } from "react";

//components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

function Home() {
  const [workouts, setWorkouts] = useState(null);
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('/api/workouts')
        const data = await response.json(); // Parse the response as JSON, now we have workout objects
        console.log(data.data);
        setWorkouts(data.data);
      } catch (error) {
        console.error("Error in fetching workouts", error);
      }
    };

    fetchWorkouts();
  }, []); //fire only once when render the home component

  return (
    <div className="home">
        <div className="workouts">
            {workouts && workouts.map((workout)=>(
                <WorkoutDetails key={workout._id} workout={workout} />
            ))}

        </div>
        <WorkoutForm/>

    </div>
  )
}

export default Home;
