import addingReducer from "./addingShot";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    addingShot: addingReducer
})

export default rootReducer;