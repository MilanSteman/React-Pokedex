import React, { useEffect, useState } from "react";
import Card from '../Card/Card';

export default function Pokedex({ input, filter }) {
    const AMOUNT_OF_POKEMONS = 649;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${AMOUNT_OF_POKEMONS}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then(response => {
                setData(response);
            })
            .catch(error => {
                console.error('Error fetching data', error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    if (loading) return "Loading...";
    if (error) return "Error fetching data.";

    let results;
    let filters;

    if (input !== '') {
        results = data.results.filter(pokemon => pokemon.name.toLowerCase().includes(input.toLowerCase()));
    } else {
        results = data.results;
    }

    if (filter) {
        filters = filter;
    }
    
    return (
        <>
            <h1>Pokedex</h1>
            <ul className='pokedex'>
                {results && results.map((result, i) => <Card key={i} pokemon={result} filter={filters} />)}
            </ul>
        </>
    )
}