import React from "react";
import axios from "axios";
import { IevolutionTypes } from "../Types/EvolutionTypes";
import filterEvolutions from "../Utils/FilterEvolution";

const useEvolution = (url: string) => {
  const [evolutionData, setEvolutionsData] = React.useState<IevolutionTypes[]>(
    []
  );

  React.useEffect(() => {
    async function getData() {
      const evolutionsRequest = await axios.get(url);
      console.log(evolutionsRequest)
      const filteredEvolution = filterEvolutions("species", evolutionsRequest);

      for (const pokemon of filteredEvolution) {
        const getEvolutionPokemon = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`
        );
        pokemon.id = getEvolutionPokemon.data.id;
      }

      setEvolutionsData(filteredEvolution);
    }

    getData();
  }, [url]);

  return evolutionData;
};
export default useEvolution;
