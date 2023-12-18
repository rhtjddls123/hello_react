import { useState, useEffect } from 'react';
const cacheUrlData: Record<string, unknown> = {};
const fetchByCache = async (url: string, init: RequestInit) => {
  if (url in cacheUrlData) return cacheUrlData[url];

  const res = await fetch(url, init);
  const data = await res.json();
  cacheUrlData[url] = data;
  return data;
};

export const useFetchs = () => {
  const useFetch = <T>(url: string, storageData?: T) => {
    const [data, setData] = useState<T | undefined>(storageData);

    useEffect(() => {
      if (data) return;
      const controller = new AbortController();
      const { signal } = controller;

      fetchByCache(url, { signal }).then((data) => setData(data));
      return () => {
        controller.abort();
      };
    }, []);

    return data;
  };
  return { useFetch };
};
