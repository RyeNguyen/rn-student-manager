import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchAllSubjectsAPI} from '../../api/subjectAPI';

export const fetchAllSubjects = createAsyncThunk(
  'Subject/fetchAllSubjects',
  async () => {
    return await fetchAllSubjectsAPI();
  },
);

const initialState = {
  subjects: [],
  isLoading: false,
  errorMsg: '',
};

const subjectSlice = createSlice({
  name: 'Subject',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllSubjects.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllSubjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subjects = action.payload;
      })
      .addCase(fetchAllSubjects.rejected, (state, action) => {
        state.errorMsg = action.error.message;
      });
  },
});

export default subjectSlice.reducer;
