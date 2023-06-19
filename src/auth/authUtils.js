import { useState, useEffect } from 'react';
import { login } from "../services/authService";

export function setAuthSesion(user, token) {
  sessionStorage.setItem('user', user);
  sessionStorage.setItem('token', token);
}

export function getSAuthSesion() {
  var user = sessionStorage.getItem('user');
  var token = sessionStorage.getItem('token');
  return {user, token};
}

export function getCredentials() {
  var user = sessionStorage.getItem('user');
  var token = sessionStorage.getItem('token');
  return `user=${user}&token=${token}`;
}


export default function useAuthJuventudIona() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({ name: null });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const userSesion = getSAuthSesion();
      if (!userSesion.token || !userSesion.user) {
        setIsLoading(false);
        return;
      }

      const loged = await login(userSesion.user, userSesion.token);
      setIsAuthenticated(loged);

      if (loged) {
        setUser({ name: userSesion.user });
      }

      setIsLoading(false);
    }

    fetchUser();
  }, []);

  return { isLoading, isAuthenticated, user };
}
