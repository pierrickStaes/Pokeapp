import { POKEMON_FAV_INIT } from '../actions/PokemonActions'; 


const INITIAL_STATE = {
    pokemonFav: []
};

export default (state = INITIAL_STATE, action)=>{
    switch(action.type){ //(retourner les pokemons favoris)
        case POKEMON_FAV_INIT:
            return { pokemonFav: action.payload }
    }
    return state;
}