import { useEffect, useState } from 'react';

export const useFetch = (fetchFunc, params) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const paramsToStr = params ? new URLSearchParams(params).toString() : '';

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setError(null);
      setData(null);

      try {
        const result = await fetchFunc(params);

        setData(result);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [fetchFunc, paramsToStr]);

  return { data, error, isLoading };
};