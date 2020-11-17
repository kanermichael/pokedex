import { rest } from "msw";
import { pokemonList } from '../TestingData/pokemonListData'
import { pokemonDetailsData } from '../TestingData/pokemonDetailsData'

export const handlers = [
    rest.get(
        "https://pokeapi.co/api/v2/pokemon?limit=6&offset=0",
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json(pokemonList)
          );
        }
      ),
      rest.get(
        "https://pokeapi.co/api/v2/pokemon/:pokemonname",
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json(pokemonDetailsData)
          );
        }
      ),
      rest.get(
        "https://pokeapi.co/api/v2/pokemon-species/caterpie",
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
                    evolution_chain: {
                        url: "https://pokeapi.co/api/v2/evolution-chain/4/"
                    }
            })
          );
        }
      ),
     
      
]
   