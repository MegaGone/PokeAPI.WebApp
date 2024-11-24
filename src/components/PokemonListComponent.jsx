import React from "react";
import { useContext } from "react";
import { PokemonContext } from "../contexts";
import { CardComponent } from "./CardComponent";

export const PokemonListComponent = () => {
  const { pokemons } = useContext(PokemonContext);

  return (
    <>
      <div className="card-list-pokemon container">
        {pokemons?.map((pokemon) => (
          <CardComponent pokemon={pokemon} key={pokemon?.id} />
        ))}
      </div>
    </>
  );
};
