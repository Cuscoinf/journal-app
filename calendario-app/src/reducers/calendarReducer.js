import { types } from "../types/types"
import moment from "moment"

const initialState = {
    events: [
        {
            title: 'Cumpleaños',
            start: moment().toDate(),
            end: moment().add(2, 'hours').toDate(),
            bgcolor: '#fad732',
            notes: 'Comprar el pastel',
            user: {
                _id: '123',
                name: 'Cristiand'
            }
        }
    ],
    activeEvent: null
}

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        default:
            return state
    }
}