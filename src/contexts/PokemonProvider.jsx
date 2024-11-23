import { useState } from "react";
import { PokemonContext } from "./PokemonContext";
import { useEffect } from "react";

export const PokemonProvider = ({ children }) => {
  const baseURL = "https://pokeapi.co/api/v2/";

  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);

  const findPokemonsPaginated = async (limit = 50) => {
    const response = await fetch(
      `${baseURL}pokemon?limit=${limit}&offset=${offset}`
    );
    const pokemons = await response.json();

    const requests = pokemons?.results?.map(async (pokemon) => {
      const response = await fetch(pokemon?.url);
      const detail = await response.json();
      return detail;
    });
    const pokemonDetails = await Promise.all(requests);

    setPokemons(pokemonDetails);
  };

  const findPokemons = async () => {
    const response = await fetch(`${baseURL}pokemon?limit=100000&offset=0`);
    const pokemons = await response.json();

    const promises = pokemons?.results?.map(async (pokemon) => {
      const response = await fetch(pokemon?.url);
      const detail = await response.json();
      return detail;
    });

    const pokemonDetails = await Promise.all(promises);
    setAllPokemons(pokemonDetails);
  };

  useEffect(() => {
    findPokemonsPaginated();
  }, []);

  useEffect(() => {
    findPokemons();
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        id: 0,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
