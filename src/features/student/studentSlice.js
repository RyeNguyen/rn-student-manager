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
      if (state.currentPage !== 1) {
        state.isRefreshing = true;
        state.students = [];
        state.currentPage = 1;
      }
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
  },
});

export const {changePage, refresh} = studentSlice.actions;
export default studentSlice.reducer;
