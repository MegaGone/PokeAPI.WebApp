import { useState } from "react";
import { PokemonContext } from "./PokemonContext";
import { useEffect } from "react";
import { formHook } from "../hooks";
import { Storage } from "../helpers";

export const PokemonProvider = ({ children }) => {
  const baseURL = "https://pokeapi.co/api/v2/";

  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

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

  const findPokemons = async (limit = 100000) => {
    let localPokemons = Storage.onFind("GLOBAL_POKEMONS");

    if (!localPokemons) {
      const response = await fetch(`${baseURL}pokemon?limit=${limit}&offset=0`);
      const generalData = await response.json();
      Storage.onStore("GLOBAL_POKEMONS", generalData?.results);
    }

    const basicData = JSON.parse(Storage.onFind("GLOBAL_POKEMONS"));
    const requests = basicData?.map(async (pokemon) => {
      const response = await fetch(pokemon?.url);
      const detail = await response.json();
      return detail;
    });

    const pokemonDetails = await Promise.all(requests);
    setAllPokemons(pokemonDetails);
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

  useEffect(() => {
    findPokemons();
  }, []);

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

  const handleCheckbox = (e) => {
    setTypeSelected({
      ...typeSelected,
      [e.target.name]: e.target.checked,
    });

    if (e.target.checked) {
      const filteredResults = allPokemons.filter((pokemon) =>
        pokemon.types.map((type) => type.type.name).includes(e.target.name)
      );
      setFilteredPokemons(filteredResults);
    } else {
      const filteredResults = allPokemons.filter(
        (pokemon) =>
          !pokemon.types.map((type) => type.type.name).includes(e.target.name)
      );
      setFilteredPokemons([...filteredResults]);
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

        handleCheckbox,
        filteredPokemons,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
