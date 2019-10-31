
import {combineReducers} from 'redux';
import weatherServiceReducer from './weatherServiceReducer';

//import tes reducers

const allReducers = combineReducers({
    weatherService:weatherServiceReducer
});

export default allReducers;