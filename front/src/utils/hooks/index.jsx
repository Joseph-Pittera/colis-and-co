import { useState, useEffect, useContext } from 'react';
import { theme } from '../context/theme';

// ******************* useFetch *******************
export function useFetch(url, options) {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  // const [error, setError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    async function fetchData() {
      try {
        console.log('url', url);
        const response = await fetch(url, options);
        const respData = await response.json();
        console.log('respData', respData);
        setData(respData);
      } catch (error) {
        console.log(error);
        setError(error);
        if (typeof response !== 'undefined') {
          const errorData = {
            status: response.status,
            message: respData.message || 'Something went wrong',
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

  return { isLoading, data, error };
}

// ******************* useTheme *******************
export function useTheme() {
  const { theme, toggleTheme } = useContext(theme);
  return { theme, toggleTheme };
}
