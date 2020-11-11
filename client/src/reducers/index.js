import addingReducer from "./addingShot";
import workoutReducer from './workoutReducer';
import deleteReducer from './deleteReducer';
import { combineReducers } from "redux";


const rootReducer = combineReducers({
    addingShot: addingReducer,
    workout: workoutReducer,
    deleting: deleteReducer
})

export default rootReducer;