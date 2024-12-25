import { useState, useEffect } from 'react';
import axios from 'axios';

//shared across all instances of the useCableData hook in that module
// Act as a shared global variable
let cachedData = null;

export const useCableData = () => {
  const [itemsDetail, setItemsDetail] = useState(cachedData);
  const [loading, setLoading] = useState(!cachedData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cachedData) {
      setItemsDetail(cachedData);
      setLoading(false);
    } else {
      const fetchItemsDetail = async () => {
        try {
          const response = await axios.get('https://ordereasedeploy-backend.onrender.com/suggestions/items');
          cachedData = response.data;
          setItemsDetail(cachedData);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchItemsDetail();
    }
  }, []);

  return { itemsDetail, loading, error };
};