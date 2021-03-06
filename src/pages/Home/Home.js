import React, { useState } from 'react';
import Pokedex from '../../components/Pokedex/Pokedex';
import Search from '../../components/Search/Search';
import Filter from '../../components/Filter/Filter';

export default function Home() {
  const [searchInput, setSearchInput] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  const handleChange = (val) => {
    setSearchInput(val);
  };

  const handleClick = (val) => {
    setActiveFilters((prev) => {
      if (prev.includes(val)) {
        return prev.filter((item) => item !== val);
      }
      return [...prev, val];
    });
  };

  return (
    <>
      <Search input={searchInput} handleChange={handleChange} />
      <Filter filters={activeFilters} handleClick={handleClick} />
      <Pokedex input={searchInput} filter={activeFilters} />
    </>
  );
}
