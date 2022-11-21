import {instance} from './instance';

export const fetchAllSubjectsAPI = async () => {
  return await instance.get('/subjects').then(response => response.data);
};

export const addNewSubjectAPI = async newData => {
  return await instance
    .post('/subjects', newData)
    .then(response => response.data);
};

export const updateSubjectAPI = async (subjectId, newData) => {
  return await instance
    .patch(`/subjects/${subjectId}`, newData)
    .then(response => response.data);
};
