import { PokemonContext } from "./PokemonContext";

export const PokemonProvider = ({ children }) => {
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
