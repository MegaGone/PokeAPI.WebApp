import React from "react";
import { useContext } from "react";
import { PokemonContext } from "../contexts";
import { CardComponent } from "./CardComponent";
import { LoaderComponent } from "./LoaderComponent";

export const PokemonListComponent = () => {
  const { pokemons, loading, filteredPokemons } = useContext(PokemonContext);

  return (
    <>
      {loading ? (
        <LoaderComponent />
      ) : (
        <div className="card-list-pokemon container">
          {filteredPokemons.length ? (
            <>
              {filteredPokemons.map((pokemon) => (
                <CardComponent pokemon={pokemon} key={pokemon.id} />
              ))}
            </>
          ) : (
            <>
              {pokemons.map((pokemon) => (
                <CardComponent pokemon={pokemon} key={pokemon.id} />
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};
