import React from 'react';
import axios from 'axios';

interface IPokemons {
    count: number,
    results: [
        {
        name: string, 
        url: string
        }
    ]
}

const useFetch = () => {

    const [offset, setOffset] = React.useState<number>(0)
    const loadNumber: number = 6
    const [loading, setLoading] = React.useState(false)
    const [data, setData] = React.useState<IPokemons>(Object)
    
    React.useEffect(() => {
        const getPokemons = async() => {
            try {
                setLoading(true)
                const getData = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${loadNumber}&offset=${offset}`)
                const {count, results} = getData.data
                setData({count, results})
            }catch(err){
                throw Error(`API Call was not successful ${err}`)
            }
            finally{
                setLoading(false)
            }
        } 
        getPokemons()

    }, [offset])

   return {offset, setOffset, data, loadNumber, loading}
}


export default useFetch;