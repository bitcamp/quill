import Cookies from 'js-cookie';

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";
const AUTH_URL = BASE_URL + "/auth";
const TOKEN_COOKIE_NAME = "auth_token";

export const getTokenFromCookies = () => {
  return Cookies.get(TOKEN_COOKIE_NAME);
}

export const setTokenInCookies = (token) => {
  Cookies.set(TOKEN_COOKIE_NAME, token);
}

export const login = async (token, email, password) => {
  const url = AUTH_URL + "/login";
  const data = { token, email, password };
  const options = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  return response;
}

export const logout = () => {
  Cookies.remove(TOKEN_COOKIE_NAME);
}

export const signup = async (email, password) => {
  const url = AUTH_URL + "/register";
  const data = { email, password };
  const options = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }

  const response = await fetch(url, options);
  return response;
}

export const verify = async (verifyToken) => {
  const url = AUTH_URL + `/verify/${verifyToken}`;
  const options = {
    method: "get", // TODO: change backend to make this a post
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);
  return response;
}

export const sendPasswordResetEmail = async (email) => {
  const url = AUTH_URL + '/reset';
  const data = { email };
  const options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, options);
  return response;
}

export const resetPassword = async (token, password) => {
  const url = AUTH_URL + '/reset/password';
  const data = { token, password };
  const options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, options);
  return response;
}

export const resendVerificationEmail = async (id) => {
  const url = AUTH_URL + '/verify/resend';
  const data = { id };
  const options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, options);
  return response;
}