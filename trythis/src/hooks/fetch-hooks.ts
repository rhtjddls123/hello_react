import { useState, useEffect } from 'react';

export const useFetchs = () => {
  const memoUrl: string[] = [];
  const memoData: any = [];
  const useFetch = <T>(url: string): T | undefined => {
    const [data, setData] = useState<T>();
    const index = memoUrl.indexOf(url);

    if (index !== -1) return memoData[index];
    memoUrl.push(url);

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

    memoData.push(data);
    return data;
  };
  return { useFetch };
};
