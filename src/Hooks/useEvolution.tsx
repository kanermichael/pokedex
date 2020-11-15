import React from 'react';
import axios from 'axios';

interface IevolutionTypes {
    name: string;
    url: string;
    id: number;
}

interface Ihaystack{
    [key: string]: any; 
}

const filterEvolutions = (needle:string, haystack:Ihaystack , found: IevolutionTypes[] = []) => {
    Object.keys(haystack).forEach((key:string) => {
        if (key === needle) {
        found.push(haystack[key]);
        }
        if (typeof haystack[key] === "object" && haystack[key] != null) {
            filterEvolutions(needle, haystack[key] as Ihaystack, found);
        }
    });
    return found;
};
  
  
const useEvolution = (url:string) => {
    const [evolutionData, setEvolutionsData] = React.useState<IevolutionTypes[]>([]);

    React.useEffect(() => {
        async function getData() {
            const evolutionsRequest = await axios.get(url);
            const filteredEvolution = filterEvolutions("species", evolutionsRequest)
      
            
            for (const pokemon of filteredEvolution) {
                const getEvolutionPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`)
                pokemon.id = getEvolutionPokemon.data.id
            }
            
            setEvolutionsData(filteredEvolution)
            
            }

            getData()
        
        }, [url])


    return evolutionData
   
}
export default useEvolution;