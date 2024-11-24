import React from "react";
import { PokemonContext } from "../contexts";
import { useLocation } from "react-router-dom";
import { LoaderComponent } from "../components";
import { transformToUpperCase } from "../helpers";
import { useContext, useState, useEffect } from "react";

export const SearchPage = () => {
  const location = useLocation();
  const { findOnePokemon } = useContext(PokemonContext);

  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);

  const findPokemonDetails = async (id) => {
    try {
      const detail = await findOnePokemon(id);
      setPokemon(detail);
    } catch (error) {
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    findPokemonDetails(location.state.toLowerCase());
  }, [location.state]);

  return (
    <main className="container main-pokemon">
      {loading ? (
        <LoaderComponent />
      ) : pokemon ? (
        <>
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
      ) : (
        <div className="container">
          <p className="p-search">
            No se encontraron resultados para esta búsqueda.
          </p>
        </div>
      )}
    </main>
  );
};
