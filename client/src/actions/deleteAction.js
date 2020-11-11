import { DELETE_WORKOUT, NOT_DELETE_WORKOUT } from '../actions/types'

export const deleteWorkout = (workoutId) => dispatch => {
    dispatch({
        type: DELETE_WORKOUT,
        payload: { isDeleting: true, deleteId: workoutId }
    })
}

export const notDeleteWorkout = () => dispatch => {
    dispatch({
        type: NOT_DELETE_WORKOUT,
        payload: { isDeleting: false, deleteId: "" }
    })
}