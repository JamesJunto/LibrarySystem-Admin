import { useState, useEffect } from "react";
import type { IBooks } from "../Interface/IBooks";

export const useFetch = (url: string) => {
  const [data, setData] = useState<IBooks[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type":"application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        

        setData(result);
        
      } catch (err: unknown) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ url]);

  return { data, loading, error };
};
