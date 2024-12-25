import { useState, useEffect } from 'react';
import axios from 'axios';

//shared across all instances of the useCableData hook in that module
// Act as a shared global variable
let cachedData = null;

export const useCompanyData = () => {
  const [billToInfo, setbillToInfo] = useState(cachedData);
  const [loading, setLoading] = useState(!cachedData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cachedData) {
      setbillToInfo(cachedData);
      setLoading(false);
    } else {
      const fetchbillToInfo = async () => {
        try {
          const response = await axios.get('https://ordereasedeploy-backend.onrender.com/suggestions/billto');
          cachedData = response.data;
          setbillToInfo(cachedData);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchbillToInfo();
    }
  }, []);

  return { billToInfo, loading, error };
};