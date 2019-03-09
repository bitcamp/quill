const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";
const SETTINGS_URL = BASE_URL + "/api/settings";

export const getPublicSettings = async () => {
  const url = SETTINGS_URL;
  const options = {
    method: "get", 
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  };
  
  const response = await fetch(url, options);
  return response;
};

export const updateRegistrationTimes = async (token, open, close) => {
  const url = SETTINGS_URL+ `/times`;
  const data = { 
      timeOpen: open,
      timeClose: close,          
  };
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

export const updateConfirmationTime = async (token, time) => {
  const url = SETTINGS_URL+ `/confirm-by`;
  const data = { 
      time: time,          
  };
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

export const updateWaitlistText= async (token, text) => {
  const url = SETTINGS_URL+ `/waitlist`;
  const data = { 
      text: text,          
  };
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

export const updateAcceptanceText = async (token, text) => {
  const url = SETTINGS_URL+ `/acceptance`;
  const data = { 
      text: text,          
  };
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

export const updateConfirmationText = async (token, text) => {
  const url = SETTINGS_URL+ `/confirmation`;
  const data = { 
      text: text,          
  };
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

export const updateAllowMinors = async (token, allowMinors) => {
  const url = SETTINGS_URL+ `/minors`;
  const data = { 
      allowMinors: allowMinors,          
  };
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