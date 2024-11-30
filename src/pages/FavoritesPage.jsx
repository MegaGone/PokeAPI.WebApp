import React from "react";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PokemonContext } from "../contexts/PokemonContext";
import { CardComponent, LoaderComponent } from "../components";

export const FavoritesPage = () => {
  const { getFavoritesPokemons, findOnePokemon } = useContext(PokemonContext);

  const [loading, setLoading] = useState(true);
  const [favoritePokemons, setFavoritePokemons] = useState([]);

  const _findfavoritePokemons = async () => {
    try {
      const pokemonIds = getFavoritesPokemons();
      const pokemons = await Promise.all(
        pokemonIds.map((id) => findOnePokemon(id))
      );

      setFavoritePokemons(pokemons);
    } catch (error) {
      setFavoritePokemons([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    _findfavoritePokemons();
  }, []);

  return (
    <>
      {loading ? (
        <LoaderComponent />
      ) : favoritePokemons.length === 0 ? (
        <div className="container no-favorites">
          <p className="p-search">
            No se encontraron resultados para esta búsqueda.
          </p>

          <div className="icon-filter custom-search-row">
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <div className="icon-filter back-button">
                <svg
                  fill="none"
                  className="icon"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                  />
                </svg>
                <span>Volver</span>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div className="container favorite-container">
          <div className="icon-filter">
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <div className="icon-filter back-button">
                <svg
                  fill="none"
                  className="icon"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                  />
                </svg>
                <span>Volver</span>
              </div>
            </Link>
          </div>

          <div className="card-list-pokemon container">
            {favoritePokemons.map((pokemon) => (
              <CardComponent pokemon={pokemon} key={pokemon.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
