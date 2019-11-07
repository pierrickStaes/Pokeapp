import { AsyncStorage } from 'react-native';

export const POKEDEX_INIT = 'POKEDEX_INIT';

/*export const init = payload => ({
    type: CITIES_INIT,
    payload
});*/

export const initPokedex = () => {
    return dispatch => {
        AsyncStorage.getItem('pokedex').then(data => {
            return dispatch({ type: POKEDEX_INIT, payload: JSON.parse(data) });
        });
    };
}

export const addPokedex = (dataPoke) => {
    return dispatch => {
        AsyncStorage.getItem('pokedex').then(data => {
            let tab = [];
            if (data !== null) {
                tab = JSON.parse(data);
            }
            tab.push(dataPoke);
            AsyncStorage.setItem('pokedex', JSON.stringify(tab))
                .then(() => {
                    return dispatch({ type: POKEDEX_INIT, payload: tab });
                });
        });
    }
}
export const deletePokedex = (pokedexNum) => {
    return dispatch => {
        AsyncStorage.getItem('pokemonFav').then(data => {
            const tab = JSON.parse(data);
            tab.splice(tab.findIndex(e => e.order === pokedexNum), 1);
            AsyncStorage.setItem('pokemonFav', JSON.stringify(tab))
                .then(() => {
                    return dispatch({ type: POKEDEX_INIT, payload: JSON.parse(data) });
                });
        });
    };
}
