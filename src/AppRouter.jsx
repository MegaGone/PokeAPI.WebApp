import React from "react";
import { NavigationComponent } from "./components";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage, PokemonPage, SearchPage, FavoritesPage } from "./pages";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<NavigationComponent />}>
        <Route index element={<HomePage />} />
        <Route path="pokemon/:id" element={<PokemonPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
