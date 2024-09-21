import { useState } from 'react';

export const useFilters = (initialFilters) => {
  const [filters, setFilters] = useState({initialFilters});

  const changeFilters = (key, value) => {
    setFilters((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  return { filters, changeFilters };
};