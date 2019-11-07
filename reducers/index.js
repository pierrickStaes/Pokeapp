
import {combineReducers} from 'redux';
import PokemonServiceReducer from './PokemonServiceReducer';
import EquipeFavReducer from './EquipeFavReducer';

//import tes reducers

const allReducers = combineReducers({
    pokemonService: PokemonServiceReducer,
    pokemonFav: EquipeFavReducer
});

export default allReducers;