import React from 'react';
import axios from 'axios';
import { IPokemons } from '../Types/FetchTypes';

const useFetch = () => {

    const [offset, setOffset] = React.useState<number>(0)
    const loadNumber: number = 6
    const [loading, setLoading] = React.useState(false)
    const [data, setData] = React.useState<IPokemons>(Object)

    const mountedRef = React.useRef(false) 
    
    React.useEffect(() => {
        mountedRef.current = true

        const getPokemons = async() => {
            try {
                setLoading(true)
                const getData = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${loadNumber}&offset=${offset}`)
                const {count, results} = getData.data
                if (mountedRef.current) {
                setData({count, results})
                setLoading(false)
                }
            }catch(err){
                throw Error(`API Call was not successful ${err}`)
            }
        } 
        getPokemons()

        return () => {
              mountedRef.current = false
        };
    }, [offset])
   return {offset, setOffset, data, loadNumber, loading}
}


export default useFetch;