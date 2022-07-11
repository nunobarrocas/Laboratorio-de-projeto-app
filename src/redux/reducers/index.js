//import liraries
import { persistCombineReducers } from 'redux-persist';
import Constants from '@Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './auth';
import patientReducer from './patient';
import speechReducer from './speech';

const config = {
    key: Constants.asyncStorageKey,
    storage: AsyncStorage,
    blacklist: []
}

const appReducer = persistCombineReducers(config, {
    auth: authReducer,
    patientItem: patientReducer,
    speech: speechReducer
});

const rootReducer = ( state, action ) => {
    return appReducer(state, action);
}

export default rootReducer;