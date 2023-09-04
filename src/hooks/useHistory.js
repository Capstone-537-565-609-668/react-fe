import { useEffect, useState } from "react";

export default function useHistory() {
  const [history, setHistory] = useState([]);
  const addToHistory = (data) => {
    const tempHistory = [...history, data];
    setHistory(tempHistory);
    localStorage.setItem("history", JSON.stringify(tempHistory));
  };
  useEffect(() => {
    if (typeof window !== typeof undefined) {
      setHistory(JSON.parse(localStorage.getItem("history")) || []);
    }
  }, []);

  return { history, addToHistory };
}
