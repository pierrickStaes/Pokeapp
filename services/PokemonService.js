import axios from 'axios';

const url=`https://pokeapi.co/api/v2/pokemon/`;

class PokemonService{
    getPokemonDataNom(nom){
        return axios.get(`${url}/${nom}`);
    }
    getPokemonDataNumero(numero){
        return axios.get(`${url}/${numero}`);
    }
}

export default PokemonService; 