import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { PokemonContext } from "../contexts";
import { LoaderComponent } from "../components";
import { transformToUpperCase } from "../helpers";
import { useEffect, useState, useContext } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";

export const PokemonPage = () => {
  const {
    findOnePokemon,
    storePokemonToFavorites,
    existsPokemonInFavorites,
    removePokemonFromFavorites,
  } = useContext(PokemonContext);

  const { id } = useParams();

  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const findPokemonDetails = async (id) => {
    const detail = await findOnePokemon(id);

    setPokemon(detail);
    setLoading(false);
  };

  const verifyPokemonInFavorites = (id) => {
    const exists = existsPokemonInFavorites(id);
    setFavorite(exists);
  };

  useEffect(() => {
    findPokemonDetails(id);
    verifyPokemonInFavorites(+id);
  }, []);

  const addToFavorites = (id) => {
    storePokemonToFavorites(id);

    setFavorite(true);
    enqueueSnackbar(`¡Pokemon añadido a favoritos!`, {
      variant: "success",
    });
  };

  const removeFromFavorites = (id) => {
    removePokemonFromFavorites(id);

    setFavorite(false);
    enqueueSnackbar(`¡Pokemon eliminado de favoritos!`, {
      variant: "error",
    });
  };

  return (
    <main className="container main-pokemon">
      {loading ? (
        <LoaderComponent />
      ) : (
        <>
          <div className="icon-filter custom-row">
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

            {!favorite ? (
              <div
                className="icon-filter favorite-button"
                onClick={() => addToFavorites(pokemon.id)}
              >
                <svg
                  fill="none"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="favorite-icon"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
                <span>Añadir a favoritos</span>
              </div>
            ) : (
              <div
                className="icon-filter favorite-button"
                onClick={() => removeFromFavorites(pokemon.id)}
              >
                <svg
                  fill="none"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="favorite-icon"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"
                  />
                </svg>

                <span>Eliminar de favoritos</span>
              </div>
            )}
          </div>

          <div className="header-main-pokemon">
            <span className="number-pokemon">#{pokemon.id}</span>
            <div className="container-img-pokemon">
              <img
                src={pokemon.sprites.other.dream_world.front_default}
                alt={`Pokemon ${pokemon?.name}`}
              />
            </div>

            <div className="container-info-pokemon">
              <h1>{transformToUpperCase(pokemon.name)}</h1>
              <div className="card-types info-pokemon-type">
                {pokemon.types.map((type) => (
                  <span key={type.type.name} className={`${type.type.name}`}>
                    {type.type.name}
                  </span>
                ))}
              </div>
              <div className="info-pokemon">
                <div className="group-info">
                  <p>Altura</p>
                  <span>{pokemon.height}</span>
                </div>
                <div className="group-info">
                  <p>Peso</p>
                  <span>{pokemon.weight}KG</span>
                </div>
              </div>
            </div>
          </div>

          <div className="container-stats">
            <h1>Estadísticas</h1>
            <div className="stats">
              <div className="stat-group">
                <span>Hp</span>
                <div className="progress-bar"></div>
                <span className="counter-stat">
                  {pokemon.stats[0].base_stat}
                </span>
              </div>
              <div className="stat-group">
                <span>Attack</span>
                <div className="progress-bar"></div>
                <span className="counter-stat">
                  {pokemon.stats[1].base_stat}
                </span>
              </div>
              <div className="stat-group">
                <span>Defense</span>
                <div className="progress-bar"></div>
                <span className="counter-stat">
                  {pokemon.stats[2].base_stat}
                </span>
              </div>
              <div className="stat-group">
                <span>Special Attack</span>
                <div className="progress-bar"></div>
                <span className="counter-stat">
                  {pokemon.stats[3].base_stat}
                </span>
              </div>
              <div className="stat-group">
                <span>Special Defense</span>
                <div className="progress-bar"></div>
                <span className="counter-stat">
                  {pokemon.stats[4].base_stat}
                </span>
              </div>
              <div className="stat-group">
                <span>Speed</span>
                <div className="progress-bar"></div>
                <span className="counter-stat">
                  {pokemon.stats[5].base_stat}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};
