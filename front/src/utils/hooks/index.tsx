import { useState, useEffect } from "react";

type ErrorData = {
  status: number;
  message: string;
};

type UseFetchReturnType<T> = {
  isLoading: boolean;
  data: T;
  error: ErrorData | null;
};

// ******************* useFetch *******************
export function useFetch<T>(
  url: string,
  options?: RequestInit
): UseFetchReturnType<T> {
  const [data, setData] = useState<T>({} as T);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorData | null>(null);

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    async function fetchData() {
      let response: Response | undefined;
      try {
        console.log("url", url);
        response = await fetch(url, options);
        const respData = (await response.json()) as T;
        setData(respData);
      } catch (error: unknown) {
        console.log(error);
        setError(error as ErrorData | null);
        if (typeof response !== "undefined") {
          const errorData = {
            status: response.status,
            message: (await response.json()).message || "Something went wrong",
          };
          console.log(errorData);
          setError(errorData);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);
  console.log("data", data, "isLoading", isLoading, "error", error);

  return { isLoading, data, error };
}
