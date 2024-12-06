import { AppRouter } from "./AppRouter";
import { PokemonProvider } from "./contexts";

function App() {
  return (
    <PokemonProvider>
      <AppRouter />
    </PokemonProvider>
  );
}

export default App;
