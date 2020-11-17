import fakeData from '../../TestingData/evolutiondata.json';
import filterEvolutions from '../../Utils/FilterEvolution'

it('finds data in tree structure and returns array with results', () => {
    const fakeresultData = [
        {
          name: 'venusaur',
          url: 'https://pokeapi.co/api/v2/pokemon-species/3/'
        },
        {
          name: 'ivysaur',
          url: 'https://pokeapi.co/api/v2/pokemon-species/2/'
        },
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
        }
      ]
    const testResult = filterEvolutions("species", fakeData)

    expect(testResult).toStrictEqual(fakeresultData)
})