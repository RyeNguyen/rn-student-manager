import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://6378ee427419b414df8669dd.mockapi.io/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});
