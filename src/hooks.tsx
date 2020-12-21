import { useEffect, useState } from 'react';

export const useAPI = (apiCall, effect = null) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const res = await apiCall();
      setData(res.data);
      setIsLoading(false);
    };
    loadData();
  }, [effect]);

  return {
    data,
    isLoading,
  };
};
