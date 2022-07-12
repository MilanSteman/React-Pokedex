import './Details.css';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

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
  }, [pokeId]);

  if (loading) return <li className="loader" />;

  if (error) return <li>Error fetching data.</li>;

  const abilities = [];
  const stats = [];

  // data.abilites.forEach((ability) => {
  //     ability.push(abilities);
  // })

  for (let i = 0; i < data.abilities.length; i++) {
    abilities.push(data.abilities[i].ability.name);
  }

  const statShortenedNames = ['hp', 'atk', 'def', 's-atk', 's-def', 'spd'];

  for (let i = 0; i < data.stats.length; i++) {
    stats.push({ name: statShortenedNames[i], value: data.stats[i].base_stat });
  }

  const pokemon = {
    id: addZero(data.id),
    name: capitalize(data.name),
    types: data.types[1] ? [data.types[0].type.name, data.types[1].type.name] : [data.types[0].type.name],
    image: data.sprites.front_default,
    height: data.height,
    weight: data.weight,
    stats,
    abilities,
  };

  let previousId;

  if (Number(pokeId) === 1) {
    previousId = 649;
  } else {
    previousId = Number(pokeId) - 1;
  }

  let nextId;

  if (Number(pokeId) === 649) {
    nextId = 1;
  } else {
    nextId = Number(pokeId) + 1;
  }

  console.log(data);

  return (
    <main className="detail-page">
      <Link to="/" className="back-button">
        <span className="material-icons">west</span>Back to home
      </Link>
      <article>
        <header>
          <figure>
            <img src={pokemon.image} alt={pokemon.name} />
          </figure>
          <h1>
            <span>{pokemon.id}</span>
            {pokemon.name}
          </h1>
          <ul>
            {pokemon &&
              pokemon.types.map((result) => (
                <li key={result} className={result}>
                  {result}
                </li>
              ))}
          </ul>
        </header>
        <section>
          <h2>Stats</h2>
          <ul className="stats">
            {pokemon &&
              pokemon.stats.map((result, i) => (
                <li key={i}>
                  <label>{result.name.toUpperCase()}</label>{' '}
                  <progress max="120" value={result.value}>
                    {' '}
                    {result.value}{' '}
                  </progress>
                </li>
              ))}
          </ul>

          <h2>Abilities</h2>
          <ul className="abilities">{pokemon && pokemon.abilities.map((result, i) => <li key={i}>{result}</li>)}</ul>
        </section>
      </article>

      <Link to={`../pokemon/${previousId}`} className="bottom-button previous">
        <span className="material-icons">west</span>Previous
      </Link>
      <Link to={`../pokemon/${nextId}`} className="bottom-button next">
        Next<span className="material-icons">east</span>
      </Link>
    </main>
  );
}
