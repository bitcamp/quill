const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";
const API_URL = BASE_URL + '/api';

export const getEvents = async () => {
  const url = API_URL + `/events`;
  const options = {
    method: 'get',
    mode: 'cors',
  };

  const response = await fetch(url, options);
  return response;
}

export const createEvent = async (token, eventInfo) => {
  const url = API_URL + `/events`;

  const options = {
    method: 'post',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(eventInfo)
  };

  const response = await fetch(url, options);
  return response;
}

export const updateEvent = async (token, eventInfo) => {
  const url = API_URL + `/events/` + eventInfo.id;

  const options = {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(eventInfo)
  };

  const response = await fetch(url, options);
  return response;
}

export const deleteEvent = async (token, id) => {
  const url = API_URL + `/events/` + id;

  const options = {
    method: 'DELETE',
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