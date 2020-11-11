import { NEW_WORKOUT, VIEW_WORKOUT } from '../actions/types'

export const viewWorkout = (workoutId, workout) => dispatch => {
    dispatch({
        type: VIEW_WORKOUT,
        payload: { id: workoutId, workout: workout }
    })
}

export const newWorkout = () => dispatch => {
    dispatch({
        type: NEW_WORKOUT,
        payload: { id: "", workout: {} }
    })
}