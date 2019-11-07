import { AsyncStorage } from 'react-native';
//import { CITIES_INIT } from '../actions/CitiesAction'; (importer l'action)


const INITIAL_STATE = {
    pokemonEquipe: []
};

export default (state = INITIAL_STATE, action)=>{
    switch(action.type){ //(retourner les pokemons favoris)
        case POKEMON_INIT:
            return { pokemonFav: action.payload }
    }
    return state;
}