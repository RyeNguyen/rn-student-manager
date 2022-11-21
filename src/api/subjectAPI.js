import {instance} from './instance';

export const fetchAllSubjectsAPI = async () => {
  return await instance.get('/subjects').then(response => response.data);
};
