import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetchPaginatedStudentsAPI} from '../../api/studentAPI';

export const fetchPaginatedStudents = createAsyncThunk(
  'Students/fetchPaginatedUsers',
  async (pagingParams, {rejectWithValue}) => {
    const {currentPage, currentLimit} = pagingParams;
    return await fetchPaginatedStudentsAPI(currentPage, currentLimit);
  },
);

const initialState = {
  students: [],
  currentPage: 1,
  currentLimit: 10,
  errorMsg: '',
};

const studentSlice = createSlice({
  name: 'Student',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPaginatedStudents.fulfilled, (state, action) => {
        state.students.push(...action.payload);
      })
      .addCase(fetchPaginatedStudents.rejected, (state, action) => {
        state.errorMsg = action.error.message;
      });
  },
});

export default studentSlice.reducer;
