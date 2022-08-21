import { useEffect, useState } from 'react';
import { extractKeyFromEachObjInArray } from '../utils/helperFunctions';

function useFetch(url) {
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setResults(extractKeyFromEachObjInArray(data.results, 'residents'));
      })
      .catch((err) => {
        console.log('Error', err.message);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [url]);

  return { results, isLoading, error };
}

export default useFetch;
