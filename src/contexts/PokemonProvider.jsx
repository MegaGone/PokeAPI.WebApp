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
  }, [offset]);

  const onClickLoadMore = () => {
    setOffset(offset + 50);
  };

  const onNextPagination = () => {
    setOffset(offset + 50);
  };

  const [typeSelected, setTypeSelected] = useState({
    grass: false,
    normal: false,
    fighting: false,
    flying: false,
    poison: false,
    ground: false,
    rock: false,
    bug: false,
    ghost: false,
    steel: false,
    fire: false,
    water: false,
    electric: false,
    psychic: false,
    ice: false,
    dragon: false,
    dark: false,
    fairy: false,
    unknow: false,
    shadow: false,
  });

  const [filteredPokemons, setfilteredPokemons] = useState([]);

  const handleCheckbox = (e) => {
    setTypeSelected({
      ...typeSelected,
      [e.target.name]: e.target.checked,
    });

    if (e.target.checked) {
      const filteredResults = globalPokemons.filter((pokemon) =>
        pokemon.types.map((type) => type.type.name).includes(e.target.name)
      );
      setfilteredPokemons([...filteredPokemons, ...filteredResults]);
    } else {
      const filteredResults = filteredPokemons.filter(
        (pokemon) =>
          !pokemon.types.map((type) => type.type.name).includes(e.target.name)
      );
      setfilteredPokemons([...filteredResults]);
    }
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

        onNextPagination,

        active,
        setActive,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
