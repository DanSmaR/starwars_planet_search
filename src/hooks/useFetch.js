import { useEffect, useState } from 'react';

function useFetch(url) {
  const [results, setResults] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not OK');
        return response.json();
      })
      .then((data) => setResults(data.results))
      .catch((err) => {
        console.log('Error', err.message);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [url]);

  return [results, isLoading, error];
}

export default useFetch;
