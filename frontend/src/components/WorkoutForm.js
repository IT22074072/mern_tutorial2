import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

export default function WorkoutForm() {

  const {dispatch} = useWorkoutsContext()

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!title || !load || !reps ){
        setError('Please provide all fields.')
        setSuccess(null)
        return;
    }
    const workout = {title, load, reps}


    try {
        const response = await fetch('/api/workouts',{
            method:'POST',
            body: JSON.stringify(workout),
            headers:{
                'Content-type': 'application/json'
            }
        })


        const data = await response.json()
        if(!data.success){
            setError(data.message);
            setSuccess(null);
            return;
        }


        setTitle('')
        setLoad('')
        setReps('')
        setError(null);
        setSuccess(data.message)
        console.log(data.data)
        dispatch({type: 'CREATE_WORKOUT' ,payload: data.data})

    } catch (error) {
        console.error("Error in creating workouts", error);
        setError("Something went wrong. Please try again later.");
        setSuccess(null)

    
    }
       
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>

      <label>Exercise Title: </label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Load (kg): </label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label>Reps: </label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button type="submit"> Add workout</button>
      {/* Display error or success messages */}
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
        
    </form>
  );
}
