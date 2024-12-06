import React from "react";
import { DotWave } from "@uiball/loaders";

export const LoaderComponent = () => {
  return (
    <div className="container-loader">
      <DotWave size={47} speed={1} color="black"></DotWave>
    </div>
  );
};
