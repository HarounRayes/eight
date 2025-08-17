'use client';

import { useEffect, useState } from "react";

export const useDebouncedQuery = (query: string, delay = 500) => {
  const [debouncedQuery, setDebouncedQuery] = useState<string>(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => clearTimeout(timer);
  }, [query, delay]);

  return debouncedQuery;
};