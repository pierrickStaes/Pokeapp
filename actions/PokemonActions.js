import { AsyncStorage } from 'react-native';

export const POKEMON_FAV_INIT = 'POKEMON_FAV_INIT';

/*export const init = payload => ({
    type: CITIES_INIT,
    payload
});*/

export const initFav = () => {
    return dispatch => {
        AsyncStorage.getItem('pokemonFav').then(data => {
            return dispatch({ type: POKEMON_FAV_INIT, payload: JSON.parse(data) });
        });
    };
}

export const addFav = (pokeSprite) => {
    return dispatch => {
        AsyncStorage.getItem('pokemonFav').then(data => {
            let tab = [];
            if (data !== null) {
                tab = JSON.parse(data);
            }
            tab.push(pokeSprite);
            AsyncStorage.setItem('pokemonFav', JSON.stringify(tab))
                .then(() => {
                    return dispatch({ type: POKEMON_FAV_INIT, payload: tab });
                });
        });
    }
}
export const deleteFav = (pokeSprite) => {
    return dispatch => {
        AsyncStorage.getItem('pokemonFav').then(data => {
            const tab = JSON.parse(data);
            tab.splice(tab.findIndex(e => e === pokeSprite), 1);
            AsyncStorage.setItem('pokemonFav', JSON.stringify(tab))
                .then(() => {
                    return dispatch({ type: POKEMON_FAV_INIT, payload: tab });
                });
        });
    };
}
export const deleteAllFav = () => {
    return dispatch => {
        AsyncStorage.removeItem('pokemonFav').then(data => {
            const tab = null
            return dispatch({ type: POKEMON_FAV_INIT, payload: tab });
        });
    };
}
