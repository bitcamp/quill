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