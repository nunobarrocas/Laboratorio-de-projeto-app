import { UPDATE_PATIENT, UPDATE_COUNTER } from "../constants";

const initialState = {    
    item: {},
    counter: 0
}

const patientReducer = (state = initialState, action) => {
    const {status, type, item, counter} = action;
    
    switch(type) {
        case UPDATE_PATIENT:
            return {...state, item};
        case UPDATE_COUNTER:
            return {...state, counter}
        default:
            return state
    }
}

export default patientReducer