import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchAllSubjectsAPI} from '../../api/subjectAPI';

export const fetchAllSubjects = createAsyncThunk(
  'Subject/fetchAllSubjects',
  async () => {
    return await fetchAllSubjectsAPI();
  },
);

export const fetchSubjectsForStudent = createAsyncThunk(
  '/Subject/fetchSubjectsForStudent',
  async (studentSubjects, thunkApi) => {
    const studentSubjectsIds = studentSubjects.map(sub => sub.id);
    const all = await fetchAllSubjectsAPI();
    return {
      reg: all.filter(sub => studentSubjectsIds.includes(sub.id)),
      unreg: all.filter(sub => !studentSubjectsIds.includes(sub.id)),
    };
  },
);

const initialState = {
  subjects: [],
  isLoading: false,
  errorMsg: '',
  registeredSubjects: [],
  unregisteredSubjects: [],
};

const subjectSlice = createSlice({
  name: 'Subject',
  initialState,
  reducers: {
    pickSubject(state, action) {
      state.registeredSubjects.push(action.payload);
      state.unregisteredSubjects = state.unregisteredSubjects.filter(
        sub => sub.id !== action.payload.id,
      );
    },
    removeSubject(state, action) {
      state.unregisteredSubjects.push(action.payload);
      state.registeredSubjects = state.registeredSubjects.filter(
        sub => sub.id !== action.payload.id,
      );
    },
    resetSubjects(state) {
      state.registeredSubjects = [];
      state.unregisteredSubjects = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllSubjects.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllSubjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subjects = action.payload;
        state.unregisteredSubjects = action.payload;
      })
      .addCase(fetchAllSubjects.rejected, (state, action) => {
        state.errorMsg = action.error.message;
      });
    builder
      .addCase(fetchSubjectsForStudent.fulfilled, (state, action) => {
        state.registeredSubjects = action.payload.reg;
        state.unregisteredSubjects = action.payload.unreg;
      })
      .addCase(fetchSubjectsForStudent.rejected, (state, action) => {
        state.errorMsg = action.error.message;
      });
  },
});

export const {pickSubject, removeSubject, resetSubjects} = subjectSlice.actions;
export default subjectSlice.reducer;
