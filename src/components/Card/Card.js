import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const addZero = (number) => {
  if (number < 10) {
    return `00${number}`;
  }
  if (number < 100) {
    return `0${number}`;
  }
  return `${number}`;
};

const remove = (number) => {
  if (number < 10) {
    return number.substring(2);
  }
  if (number < 100) {
    return number.substring(1);
  }
  return number;
};

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default function Card({ filter, ...individualPokemon }) {
  const { name } = individualPokemon.pokemon;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [match, setMatch] = useState(false);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      // eslint-disable-next-line no-shadow
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  useEffect(() => {
    let matchesOne = false;
    if (data) {
      filter.forEach((f) => {
        // eslint-disable-next-line no-use-before-define
        if (f === pokemon.types[0] || f === pokemon.types[1]) {
          matchesOne = true;
        }
      });

      // eslint-disable-next-line no-unused-expressions
      matchesOne ? setMatch(true) : setMatch(false);
    }
  }, [data, filter]);

  if (loading) return <li className="loader" />;

  if (error) return <li>Error fetching data.</li>;

  const pokemon = {
    id: addZero(data.id),
    name: capitalize(data.name),
    types: data.types[1] ? [data.types[0].type.name, data.types[1].type.name] : [data.types[0].type.name],
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
  };

  if (filter.length > 0 && match === false) {
    return null;
  }

  return (
    <li className={pokemon && pokemon.types[1] ? `${pokemon.types[0]} ${pokemon.types[1]}` : `${pokemon.types[0]}`}>
      <Link to={`/pokemon/${remove(pokemon.id)}`}>
        <img src={pokemon.image} alt={pokemon.name} />

        <div>
          <p>{pokemon.id}</p>
          <h3>{pokemon.name}</h3>

          <ul>{pokemon && pokemon.types.map((result) => <li key={result}>{result}</li>)}</ul>
        </div>
      </Link>
    </li>
  );
}
