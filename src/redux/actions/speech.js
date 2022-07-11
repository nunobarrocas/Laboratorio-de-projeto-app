import { UPDATE_SPEECH } from "../constants";

export const updateSpeech = (text) => {
    return {
        type: UPDATE_SPEECH,
        text
    }      
    
}