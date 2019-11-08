import axios from 'axios';

const url=`https://pokeapi.co/api/v2/pokemon/`;
const url2=`https://pokeapi.co/api/v2/pokemon-species/`;


class PokemonService{
    getPokemonDataNom(nom){
        return axios.get(`${url}/${nom}`);
    }
    getPokemonDataNumero(numero){
        return axios.get(`${url}/${numero}`);
    }
    getPokemonSpeciesDataNumero(numero){
        return axios.get(`${url2}/${numero}`)
    }
}

export default PokemonService; 