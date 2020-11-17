import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PokemonList from '../PokemonList';
import Header from '../Header';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router'

const server = setupServer(
    rest.get('https://pokeapi.co/api/v2/pokemon?limit=6&offset=0', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "count": 1050,
                "next": "https://pokeapi.co/api/v2/pokemon?offset=6&limit=6",
                "previous": null,
                "results": [
                {
                "name": "bulbasaur",
                "url": "https://pokeapi.co/api/v2/pokemon/1/"
                },
                {
                "name": "ivysaur",
                "url": "https://pokeapi.co/api/v2/pokemon/2/"
                },
                {
                "name": "venusaur",
                "url": "https://pokeapi.co/api/v2/pokemon/3/"
                },
                {
                "name": "charmander",
                "url": "https://pokeapi.co/api/v2/pokemon/4/"
                },
                {
                "name": "charmeleon",
                "url": "https://pokeapi.co/api/v2/pokemon/5/"
                },
                {
                "name": "charizard",
                "url": "https://pokeapi.co/api/v2/pokemon/6/"
                }
                ]
                }
            )
        )
    }),
    rest.get('https://pokeapi.co/api/v2/pokemon?limit=6&offset=6', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "count": 1050,
                "next": "https://pokeapi.co/api/v2/pokemon?offset=6&limit=6",
                "previous": null,
                "results": [
                {
                "name": "2",
                "url": "https://pokeapi.co/api/v2/pokemon/1/"
                },
                {
                "name": "3",
                "url": "https://pokeapi.co/api/v2/pokemon/2/"
                },
                {
                "name": "venusaur",
                "url": "https://pokeapi.co/api/v2/pokemon/3/"
                },
                {
                "name": "charmander",
                "url": "https://pokeapi.co/api/v2/pokemon/4/"
                },
                {
                "name": "charmeleon",
                "url": "https://pokeapi.co/api/v2/pokemon/5/"
                },
                {
                "name": "charizard",
                "url": "https://pokeapi.co/api/v2/pokemon/6/"
                }
                ]
                }
            )
        )
    })
)

beforeAll(() => server.listen())
afterAll(()=> server.close())
afterEach(()=> server.resetHandlers())


describe('Pokemon Overview Page ', () => {

    it('loads pokemonlist', async () => {
        render(
        <MemoryRouter>
         <PokemonList/>
        </MemoryRouter>)
        
        await waitFor(() => screen.getAllByLabelText('pokemon-name'))
        
        // Check that first and last pokemon of page are there
        expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument()
        expect(screen.getByText(/charizard/i)).toBeInTheDocument()
        // Check that the next button is enabled
        expect(screen.getByLabelText(/next/i)).toBeEnabled()
        // check that previous button is disabled on first page
        expect(screen.getByLabelText(/previous/i)).toBeDisabled()
        // Clicks the next page button
        fireEvent.click(screen.getByLabelText(/next/i))

        await waitFor(() => screen.getByText('squirtle'))

        const name = screen.getAllByLabelText('pokemon-name')

        console.log(name)
    

    })
    it('Loads Header correctly', () => {
        render(<Header />)
        expect(screen.getByText('Pokedex'))
    })

})