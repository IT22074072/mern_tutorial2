import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';


//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function WorkoutDetails({workout}) {
  const {dispatch} = useWorkoutsContext()

const handleClick = async () => {
  try {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Workout deleted:", data);
      dispatch({ type: 'DELETE_WORKOUT', payload: data.data });
    } else {
      console.error("Error deleting workout:", data.error);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};



  return (
    <div className='workout-details'>
        <h4>{workout.title}</h4>
        <p>
            <strong>Load (kg): </strong>
            {workout.load}
        </p>
        <p>
            <strong>Reps: </strong>
            {workout.reps}
        </p>
        <p>
            {formatDistanceToNow(new Date(workout.createdAt),{addSuffix:true})}
        </p>

        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}
