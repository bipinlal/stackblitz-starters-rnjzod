import React, { useEffect, useState } from 'react';
import './style.css';

export default function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonAbilitiesData, setPokemonAbilitiesData] = useState([]);

  const fetchData = async (url) => {
    const response = await fetch(url)
      .then((res) => res.json())
      .then((data) => data);
    return response;
  };

  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = await fetchData('https://pokeapi.co/api/v2/pokemon');
      setPokemonData(response?.results);
    };
    fetchPokemonData();
  }, []);

  const handleSelectChange = (e) => {
    const selectedVal = e.target.value;
    const fetchPokemonData = async () => {
      const response = await fetchData(selectedVal);
      setPokemonAbilitiesData(response?.abilities);
    };
    fetchPokemonData();
  };

  return (
    <div>
      <h4>React</h4>
      <select onChange={handleSelectChange}>
        {pokemonData.map((item) => {
          return <option value={item.url}>{item.name}</option>;
        })}
      </select>
      {pokemonAbilitiesData.map((item) => {
        return <div>{item.ability.name}</div>;
      })}
    </div>
  );
}
