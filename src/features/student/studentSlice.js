import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {
  fetchPaginatedStudentsAPI,
  addStudentAPI,
  updateStudentAPI,
  fetchStudentByIdAPI,
} from '../../api/studentAPI';

export const fetchPaginatedStudents = createAsyncThunk(
  'Students/fetchPaginatedUsers',
  async (pagingParams, {rejectWithValue}) => {
    const {currentPage, currentLimit} = pagingParams;
    return await fetchPaginatedStudentsAPI(currentPage, currentLimit);
  },
);

export const fetchStudentById = createAsyncThunk(
  'Students/fetchStudentById',
  async (studentId, thunkApi) => {
    return await fetchStudentByIdAPI(studentId);
  },
);

export const addStudent = createAsyncThunk(
  'Subject/addStudent',
  async (data, thunkApi) => {
    return await addStudentAPI(data);
  },
);

export const updateStudent = createAsyncThunk(
  'Subjects/updateStudent',
  async (data, thunkApi) => {
    return await updateStudentAPI(data.id, data);
  },
);

const initialState = {
  students: [],
  currentStudent: null,
  currentPage: 1,
  currentLimit: 10,
  errorMsg: '',
  isLoading: false,
  isRefreshing: false,
};

const studentSlice = createSlice({
  name: 'Student',
  initialState,
  reducers: {
    changePage(state) {
      state.currentPage++;
    },
    refresh(state) {
      //if (state.currentPage !== 1) {
      state.isRefreshing = true;
      state.students = [];
      //state.currentPage = 1;
      //}
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPaginatedStudents.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchPaginatedStudents.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.isLoading = false;
        state.students.push(...action.payload);
      })
      .addCase(fetchPaginatedStudents.rejected, (state, action) => {
        state.errorMsg = action.error.message;
      });
    builder
      .addCase(fetchStudentById.pending, (state, action) => {})
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.currentStudent = action.payload;
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.errorMsg = action.error.message;
      });
    builder
      .addCase(addStudent.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.errorMsg = action.error.message;
      });
    builder
      .addCase(updateStudent.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.errorMsg = action.error.message;
      });
  },
});

export const {changePage, refresh} = studentSlice.actions;
export default studentSlice.reducer;
