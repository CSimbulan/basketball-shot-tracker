import { NEW_WORKOUT, VIEW_WORKOUT } from '../actions/types'

const initialState = {
    isNewWorkout: true,
    workoutId: "",
    workout: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case VIEW_WORKOUT:
            return {
                isNewWorkout: false,
                workoutId: action.payload.id,
                workout: action.payload.workout
            }
        case NEW_WORKOUT:
            return {
                isNewWorkout: true,
                workoutId: action.payload.id,
                workout: action.payload.workout
            }
        default:
            return state
    }
}