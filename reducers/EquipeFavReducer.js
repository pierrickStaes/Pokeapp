import { AsyncStorage } from 'react-native';
//import { CITIES_INIT } from '../actions/CitiesAction'; (importer l'action)


const INITIAL_STATE = {
    pokemonEquipe: []
};

export default (state = INITIAL_STATE, action)=>{
    /*switch(action.type){ (retourner les pokemons favoris)
        case CITIES_INIT:
            return { cities: action.payload }
    }*/
    return state;
}