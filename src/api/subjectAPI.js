import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://6378ee427419b414df8669dd.mockapi.io/api/v1',
});

export const fetchAllSubjectsAPI = async () => {
  return await instance.get('/subjects').then(response => response.data);
};
