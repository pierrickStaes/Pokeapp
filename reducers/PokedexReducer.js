import { POKEDEX_INIT } from '../actions/PokedexActions'; 


const INITIAL_STATE = {
    pokedex: []
};

export default (state = INITIAL_STATE, action)=>{
    switch(action.type){ //(retourner les pokemons du pokedex)
        case POKEDEX_INIT:
            return { pokedex: action.payload }
    }
    return state;
}