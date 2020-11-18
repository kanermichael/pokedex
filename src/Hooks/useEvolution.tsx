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

      const filteredEvolution = filterEvolutions("species", evolutionsRequest);
      const reverseFilteredEvolution = filteredEvolution.reverse();

      for (const pokemon of reverseFilteredEvolution) {
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
