const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";
const SETTINGS_URL = BASE_URL + "/admin";

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

export const updateRegistrationTimes = async (open, close) => {
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
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  return response;
};

export const updateConfirmationTime = async (time) => {
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
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  return response;
};

export const updateWaitlistText= async (text) => {
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
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  return response;
};

export const updateAcceptanceText = async (text) => {
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
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  return response;
};

export const updateConfirmationText = async (text) => {
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
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  return response;
};

export const updateAllowMinors = async (allowMinors) => {
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
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  return response;
};