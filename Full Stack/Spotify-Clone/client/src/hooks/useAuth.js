import axios from "axios";
import { useEffect, useState } from "react";

export function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:5000/login", {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/");
      })
      .catch(() => (window.location = "/"));
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) {
      return;
    }

    const timeout = setInterval(() => {
      axios
        .post("http://localhost:5000/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
          window.history.pushState({}, null, "/");
        })
        .catch(() => (window.location = "/"));
    }, (expiresIn - 60) * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [refreshToken, expiresIn]);

  return accessToken;
}
