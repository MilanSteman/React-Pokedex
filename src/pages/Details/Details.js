import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const addZero = (number) => {
    if (number < 10) {
        return `00${number}`;
    }
    if (number < 100) {
        return `0${number}`;
    }
    return number;
};

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default function Details() {
    const { pokeId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
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
    }, [pokeId]);

    if (loading) return <li className="loader"></li>

    if (error) return <li>Error fetching data.</li>;

    let abilities = [];
    let stats = [];

    // data.abilites.forEach((ability) => {
    //     ability.push(abilities);
    // })

    for (let i = 0; i < data.abilities.length; i++) {
        abilities.push(data.abilities[i].ability.name)
    }

    for (let i = 0; i < data.stats.length; i++) {
        stats.push({name: data.stats[i].stat.name, value: data.stats[i].base_stat})
    }

    const pokemon = {
        id: addZero(data.id),
        name: capitalize(data.name),
        types: data.types[1]
            ? [data.types[0].type.name, data.types[1].type.name]
            : [data.types[0].type.name],
        image: data.sprites.front_default,
        height: data.height,
        weight: data.weight,
        stats: stats,
        abilities: abilities
    }

    let previousId;

    if (Number(pokeId) === 1) {
        previousId = 649;
        console.log('first')
    } else {
        previousId = Number(pokeId) - 1;
    }

    let nextId;

    if (Number(pokeId) === 649) {
        nextId = 1;
    } else {
        nextId = Number(pokeId) + 1;
    }

    return (
        <div>
            <Link to={'/'}>Back to home</Link>
            <img src={pokemon.image} alt={pokemon.name}></img>

            <div>
                <p>{pokemon.id}</p>
                <h3>{pokemon.name}</h3>

                <ul>
                    {pokemon && pokemon.types.map(result => <li key={result}>{result}</li>)}
                </ul>

                <ul>
                    {pokemon && pokemon.stats.map((result, i) => <li key={i}>{result.name}: {result.value}</li>)}
                </ul>
                
                <ul>
                    {pokemon && pokemon.abilities.map((result, i) => <li key={i}>{result}</li>)}
                </ul>
            </div>

            <Link to={`../pokemon/${previousId}`}>Previous</Link>
            <Link to={`../pokemon/${nextId}`}>Next</Link>
        </div>
    )
}
