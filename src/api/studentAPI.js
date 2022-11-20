import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://6378ee427419b414df8669dd.mockapi.io/api/v1',
});

export const fetchPaginatedStudentsAPI = async (page = 1, limit = 10) => {
  return await instance
    .get(`/students?page=${page}&limit=${limit}&sortBy=createdAt&order=desc`)
    .then(response => response.data);
};

export const fetStudentById = async studentId => {
  await instance
    .get(`/students/:id=${studentId}`)
    .then(response => console.log(response.data))
    .catch(error => console.log(error));
};

export const addStudent = async newData => {
  await instance
    .post('/students', newData)
    .then(response => console.log(response.data))
    .catch(error => console.log(error));
};

export const updateStudent = async newData => {
  await instance
    .put(`/students:id=${newData.id}`, newData)
    .then(response => console.log(response.data))
    .catch(error => console.log(error));
};

export const deleteStudent = async studentId => {
  await instance
    .delete(`/students:id=${studentId}`)
    .then(response => console.log(response.data))
    .catch(error => console.log(error));
};
