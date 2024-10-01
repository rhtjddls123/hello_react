import { useEffect, useState } from "react";

export default function useFetch<T>(fetchFn: () => Promise<T>, initialValue: T) {
  const [fetchedData, setFetchedData] = useState(initialValue);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError({ ...error, message: error.message || "Failed to fetch user places." });
        }
      }
      setIsFetching(false);
    }
    fetchPlaces();
  }, [fetchFn]);

  return {
    fetchedData,
    setFetchedData,
    isFetching,
    error
  };
}
