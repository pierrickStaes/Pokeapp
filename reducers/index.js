
import {combineReducers} from 'redux';
import PokemonServiceReducer from './PokemonServiceReducer';

//import tes reducers

const allReducers = combineReducers({
    pokemonService: PokemonServiceReducer
});

export default allReducers;