import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promiseMiddleware from "./middleware/ApiCalls";
import rootReducer from '@Reducer';

let middleware = [thunk, promiseMiddleware];

const reduxStore = createStore(
    rootReducer,
    compose(
        applyMiddleware(...middleware),
    )
);

export default reduxStore;