import React, { useEffect, useState } from 'react'

export default function Filter({ activeFilters, handleClick }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/type/`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data', error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    if (loading) return "Loading...";
    if (error) return "Error fetching data.";

    let results = data.results;

    return (
        <ul className='typeList'>
            {results && results.map((result, i) => <li key={i}><button onClick={e => { handleClick(e.target.value) }} value={result.name}>{result.name}</button></li>)}
        </ul >
    )
}
