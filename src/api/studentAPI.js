import {instance} from './instance';

export const fetchPaginatedStudentsAPI = async (page = 1, limit = 10) => {
  return await instance
    .get(`/students?page=${page}&limit=${limit}`)
    .then(response => response.data);
};

export const fetchStudentByIdAPI = async studentId => {
  await instance.get(`/students/${studentId}`).then(response => response.data);
};

export const addStudentAPI = async newData => {
  return await instance
    .post('/students', newData)
    .then(response => response.data);
};

export const updateStudentAPI = async (userId, newData) => {
  await instance
    .patch(`/students/${userId}`, newData)
    .then(response => response.data);
};

export const deleteStudent = async studentId => {
  await instance
    .delete(`/students:id=${studentId}`)
    .then(response => console.log(response.data))
    .catch(error => console.log(error));
};
