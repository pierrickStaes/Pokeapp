
import {combineReducers} from 'redux';
import PokemonServiceReducer from './PokemonServiceReducer';
import EquipeFavReducer from './EquipeFavReducer';
import PokedexReducer from './PokedexReducer';

//import tes reducers

const allReducers = combineReducers({
    pokemonService: PokemonServiceReducer,
    pokemonFav: EquipeFavReducer,
    pokedex: PokedexReducer
});

export default allReducers;