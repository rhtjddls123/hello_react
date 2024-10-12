import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url: string, config?: RequestInit) {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw Error(resData.message || "Something went wrong, failed to send request.");
  }

  return resData;
}

interface UseHttpProps<T> {
  url: string;
  config?: RequestInit;
  initialData?: T;
}

export default function useHttp<T>({ url, config, initialData }: UseHttpProps<T>) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const clearData = () => {
    setData(initialData);
  };

  const sendRequest = useCallback(
    async function sendRequest(data?: string) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "Something went wrong!");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData
  };
}
