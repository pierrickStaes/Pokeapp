import PokemonService from "../services/PokemonService";

const INITIAL_STATE = {
  Pokeserv : new PokemonService()
}

function PokemonServiceReducer(state = INITIAL_STATE, action) {
  return state;
}

export default PokemonServiceReducer;