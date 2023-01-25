import { useEffect, useState } from "react";

const PREFIX = "chat-app-";

export function useLocalStorage(key, initialValue) {
  const newKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(newKey);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(newKey, JSON.stringify(value));
  }, [newKey, value]);

  return [value, setValue];
}
