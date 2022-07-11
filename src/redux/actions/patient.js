import { UPDATE_PATIENT, UPDATE_COUNTER } from "../constants";

export const updatePatient = (item) => {
    return {
        type: UPDATE_PATIENT,
        item
    }   
}

export const updateCounter = (counter) => {
    return{
        type: UPDATE_COUNTER,
        counter
    }
}