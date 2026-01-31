import { useState, useEffect } from 'react';
import { MOCK_EXPERTS } from '../data/api';

export const useExperts = () => {
  const [experts, setExperts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExperts(MOCK_EXPERTS);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return { experts, loading };
};