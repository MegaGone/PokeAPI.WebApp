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
      setActive(false);
    } else {
      const filteredResults = allPokemons.filter(
        (pokemon) =>
          !pokemon.types.map((type) => type.type.name).includes(e.target.name)
      );
      setFilteredPokemons([...filteredResults]);
      setActive(false);
    }
  };

  // FAVORITOS
  const storePokemonToFavorites = (pokemon) => {
    const storage = Storage.onFindDecoded("FAVORTES_POKEMONS");

    let favoritePokemons = [];
    if (storage) favoritePokemons = JSON.parse(storage);

    if (!favoritePokemons.includes(pokemon)) favoritePokemons.push(pokemon);

    Storage.onStoreEncoded(
      "FAVORTES_POKEMONS",
      JSON.stringify(favoritePokemons)
    );
  };

  const existsPokemonInFavorites = (pokemon) => {
    const storage = Storage.onFindDecoded("FAVORTES_POKEMONS");
    if (!storage) return false;

    const favorites = JSON.parse(storage);
    return favorites.includes(pokemon);
  };

  const removePokemonFromFavorites = (pokemon) => {
    const storage = Storage.onFindDecoded("FAVORTES_POKEMONS");
    if (!storage) return false;

    const pokemons = JSON.parse(storage);
    const favorites = pokemons?.filter((p) => p != pokemon);

    Storage.onStoreEncoded("FAVORTES_POKEMONS", JSON.stringify(favorites));
  };

  const getFavoritesPokemons = () => {
    const storage = Storage.onFindDecoded("FAVORTES_POKEMONS");
    if (!storage) return false;

    const pokemons = JSON.parse(storage);
    return pokemons;
  };

  const [filteredOffset, setFilteredOffset] = useState(0);
  const [paginatedFilteredPokemons, setPaginatedFilteredPokemons] = useState(
    []
  );

  const paginateFilteredPokemons = (limit = 50) => {
    const start = filteredOffset;
    const end = filteredOffset + limit;
    const paginated = filteredPokemons.slice(start, end);
    setPaginatedFilteredPokemons(paginated);
  };

  useEffect(() => {
    paginateFilteredPokemons();
  }, [filteredPokemons, filteredOffset]);

  const onNextFilteredPagination = () => {
    if (filteredOffset + 50 < filteredPokemons.length) {
      setFilteredOffset((prevOffset) => prevOffset + 50);
    }
  };

  const onPreviousFilteredPagination = () => {
    setFilteredOffset((prevOffset) => Math.max(0, prevOffset - 50));
  };

  return (
    <PokemonContext.Provider
      value={{
        searchValue,
        onInputChange,
        onResetForm,
        pokemons,
        findOnePokemon,

        loading,
        setLoading,

        onNextPagination,

        active,
        setActive,

        handleCheckbox,
        filteredPokemons,

        storePokemonToFavorites,
        existsPokemonInFavorites,
        removePokemonFromFavorites,
        getFavoritesPokemons,

        filteredOffset,
        onNextFilteredPagination,
        paginatedFilteredPokemons,
        onPreviousFilteredPagination,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
