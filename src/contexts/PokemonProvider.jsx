import { useState } from "react";
import { PokemonContext } from "./PokemonContext";
import { useEffect } from "react";
import { formHook } from "../hooks";

export const PokemonProvider = ({ children }) => {
  const baseURL = "https://pokeapi.co/api/v2/";

  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState([]);

  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);

  const { onInputChange, onResetForm, searchValue } = formHook({
    searchValue: "",
  });

  const findPokemonsPaginated = async (limit = 50) => {
    const response = await fetch(
      `${baseURL}pokemon?limit=${limit}&offset=${offset}`
    );
    const localPokemons = await response.json();

    const requests = localPokemons?.results?.map(async (pokemon) => {
      const response = await fetch(pokemon?.url);
      const detail = await response.json();
      return detail;
    });
    const pokemonDetails = await Promise.all(requests);

    setPokemons([...pokemons, ...pokemonDetails]);
    setLoading(false);
  };

  // FUNCIÓN REUTILIZABLE PARA BUSCAR POR ID/NOMBRE
  const findOnePokemon = async (input) => {
    const response = await fetch(`${baseURL}pokemon/${input}`);
    const pokemon = await response.json();
    return pokemon;
  };

  useEffect(() => {
    findPokemonsPaginated();
  }, []);

  const onClickLoadMore = () => {
    setOffset(offset + 50);
  };

  return (
    <PokemonContext.Provider
      value={{
        searchValue,
        onInputChange,
        onResetForm,
        pokemons,
        findOnePokemon,
        onClickLoadMore,

        loading,
        setLoading,

        active,
        setActive,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
