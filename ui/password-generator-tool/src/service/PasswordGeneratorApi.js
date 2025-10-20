import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080/";

export const generatePasswordApi = (characters) =>
  axios.post(apiUrl, characters);

export const passwordStrengthVerifier = (password) =>
  axios.post(apiUrl + "verifier", password);

export const sentMailApi = (requestData) =>
  axios.post(apiUrl + "mail", requestData);

export const suggestPasswordApi = () => axios.post(apiUrl + "suggest");

export const saveEmailConfigApi = (emailConfig) =>
  axios.post(apiUrl + "email-config", emailConfig);

export const getEmailConfigApi = () => axios.get(apiUrl + "email-config");

export const getEmailConfigStatusApi = () =>
  axios.get(apiUrl + "email-config/status");