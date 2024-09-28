import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay: number) => {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    const interval = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => clearInterval(interval);
  }, [value, delay]);

  return debounce;
};