const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";
const API_URL = BASE_URL + '/api';

export const updateProfile = async (token, id, profile) => {
  const url = API_URL + `/users/${id}/profile`;
  const data = { profile };
  const options = {
    method: 'put',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, options);
  return response;
};

export const updateConfirmation = async (token, id, confirmation) => {
  const url = API_URL + `/users/${id}/confirm`;
  const data = { confirmation };
  const options = {
    method: 'put',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, options);
  return response;
}

export const decline = async (token, id) => {
  const url = API_URL + `/users/${id}/decline`;
  const options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  };

  const response = await fetch(url, options);
  return response;
}