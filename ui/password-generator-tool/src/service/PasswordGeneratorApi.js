import axios from "axios";

const apiUrl = "http://localhost:8080/";
// const apiUrl = "http://Pgt-aws-server-env.eba-nj3vrmpc.ap-south-1.elasticbeanstalk.com/"

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
