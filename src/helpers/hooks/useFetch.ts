import { useEffect, useState } from 'react';

interface FetchFunction<P, T> {
  (params?: P): Promise<T>;
}

interface IUseFetchResult<T> {
  data: T | null | undefined;
  isLoading: boolean;
  error?: Error | null;
}

export const useFetch = <T, P>(
  fetchFunc: FetchFunction<P, T>,
  params?: P,
): IUseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

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
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [fetchFunc, paramsToStr]);

  return { data, error, isLoading };
};
