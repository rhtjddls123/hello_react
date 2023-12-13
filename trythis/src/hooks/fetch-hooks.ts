import { useState, useEffect } from 'react';

export const useFetchs = () => {
  const cache: Record<string, any> = {};
  const useFetch = <T>(url: string): T | undefined => {
    const [data, setData] = useState<T>();

    if (cache[url]) {
      return cache[url];
    }

    useEffect(() => {
      const controller = new AbortController();
      const { signal } = controller;

      const fetchObj = async () => {
        const response = await fetch(url, { signal })
          .then((res) => res.json())
          .then((data) => setData(data));
        return response;
      };
      fetchObj();
      return () => {
        controller.abort();
      };
    }, []);

    cache[url] = data ?? {};
    return data;
  };
  return { useFetch };
};
