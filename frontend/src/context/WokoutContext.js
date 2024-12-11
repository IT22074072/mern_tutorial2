import { createContext, useReducer } from "react";

// Create the context
export const WorkoutsContext = createContext();

// Reducer function
export const workoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload, // Replace current workouts with payload
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...(state.workouts || [])], // Add new workout to the beginning
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
    default:
      console.warn(`Unhandled action type: ${action.type}`);
      return state; // Return unchanged state
  }
};

// Context provider component
export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: [], // Initialize with an empty array
  });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
