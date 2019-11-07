import { AsyncStorage } from 'react-native';

export const POKEMON_FAV_INIT = 'POKEMON_FAV_INIT';
export const POKEMON_FAV_ADD = 'POKEMON_FAV_ADD';
export const POKEMON_FAV_DELETE = 'POKEMON_FAV_DELETE';

/*export const init = payload => ({
    type: CITIES_INIT,
    payload
});*/

export const initAsync = () => {
    return dispatch => {
        AsyncStorage.getItem('pokemonFav').then(data => {
            return dispatch({ type: POKEMON_FAV_INIT, payload: JSON.parse(data) });
        });
    };
}

export const addAsync = () => {
    return dispatch => {
        AsyncStorage.getItem('pokemonFav').then(data => {
            let tab = [];
            if (data !== null) {
                tab = JSON.parse(data);
            }
            tab.push(this.state.pokemonName);
            AsyncStorage.setItem('pokemonFav', JSON.stringify(tab))
                .then(() => {
                    return dispatch({ type: POKEMON_FAV_INIT, payload: tab });
                });
        });
    }
}
export const deleteAsync = (pokemonName) => {
    return dispatch => {
        AsyncStorage.getItem('pokemonFav').then(data => {
            const tab = JSON.parse(data);
            tab.splice(tab.findIndex(e => e === cityName), 1);
            AsyncStorage.setItem('pokemonFav', JSON.stringify(tab))
                .then(() => {
                    return dispatch({ type: POKEMON_FAV_INIT, payload: JSON.parse(data) });
                });
        });
    };
}
