/** @format */

import { GET_SUCCESS, GET_ERROR, SET_SELECTED } from "./actions";

const initialState = {
    entities: null,
    timeStamp: null,
    errorTimeStamp: null,
    selectedTimeStamp: null,
    selected: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case GET_SUCCESS:
            newState.entities = action.payload.receive;
            newState.timeStamp = new Date().getTime();
            if (newState.selected && newState.selected.currentExpediente) {
                newState.selected.currentExpediente = newState.entities.find((c) => c.Numero == newState.selected.currentExpediente.Numero);
            }
            break;
        case GET_ERROR:
            newState.errorTimeStamp = new Date().getTime();
            break;
        case SET_SELECTED:
            newState.selectedTimeStamp = new Date().getTime();
            newState.selected = action.selected;
            break;
    }
    return newState;
};
