import { DELETE_WORKOUT, NOT_DELETE_WORKOUT } from '../actions/types'

const initialState = {
    isDeleting: false,
    deleteId: ""
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DELETE_WORKOUT:
            return {
                isDeleting: true,
                deleteId: action.payload.deleteId
            }
        case NOT_DELETE_WORKOUT:
            return {
                isDeleting: false,
                deleteId: ""
            }
        default:
            return state
    }
}