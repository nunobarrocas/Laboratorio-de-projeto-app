import { UPDATE_SPEECH } from "../constants";

const initialState = {    
    text: '',
    
}

const speechReducer = (state = initialState, action) => {
    const {status, type, text} = action;
    
    switch(type) {
        case UPDATE_SPEECH:
            return {...state, text};
        default:
            return state
    }
}

export default speechReducer