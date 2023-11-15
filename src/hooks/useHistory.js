import { useEffect, useState } from "react";

export default function useHistory(key) {
  const [history, setHistory] = useState([]);
  const addToHistory = (data) => {
    const tempHistory = [...history, data];
    setHistory(tempHistory);
    localStorage.setItem(key, JSON.stringify(tempHistory));
  };
  useEffect(() => {
    if (typeof window !== typeof undefined) {
      setHistory(JSON.parse(localStorage.getItem(key)) || []);
    }
  }, [key]);

  return { history, addToHistory };
}

/*

import { useEffect, useState } from "react";

export default function useHistory(key = "history") {
  const [history, setHistory] = useState([]);
  const addToHistory = (data) => {
    const tempHistory = [...history, data];
    setHistory(tempHistory);
    localStorage.setItem(key, JSON.stringify(tempHistory));
  };
  useEffect(() => {
    if (typeof window !== typeof undefined) {
      setHistory(JSON.parse(localStorage.getItem(key)) || []);
    }
  }, [key]);

  return { history, addToHistory };
}

*/
