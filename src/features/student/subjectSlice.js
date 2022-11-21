import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  fetchAllSubjectsAPI,
  addNewSubjectAPI,
  updateSubjectAPI,
} from '../../api/subjectAPI';

export const fetchAllSubjects = createAsyncThunk(
  'Subject/fetchAllSubjects',
  async () => {
    return await fetchAllSubjectsAPI();
  },
);

export const fetchSubjectsForStudent = createAsyncThunk(
  'Subject/fetchSubjectsForStudent',
  async (studentSubjects, thunkApi) => {
    const studentSubjectsIds = studentSubjects.map(sub => sub.id);
    const all = await fetchAllSubjectsAPI();
    return {
      reg: all.filter(sub => studentSubjectsIds.includes(sub.id)),
      unreg: all.filter(sub => !studentSubjectsIds.includes(sub.id)),
    };
  },
);

export const addNewSubject = createAsyncThunk(
  'Subject/addNewSubject',
  async (newSubject, thunkApi) => {
    return await addNewSubjectAPI(newSubject);
  },
);

export const updateSubject = createAsyncThunk(
  'Subject/updateSubject',
  async ([subjectToUpdate, studentId], thunkApi) => {
    return await updateSubjectAPI(subjectToUpdate.id, {
      ...subjectToUpdate,
      students: [...subjectToUpdate.students, studentId],
    });
  },
);

const initialState = {
  subjects: [],
  isRefreshing: false,
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
        state.isRefreshing = true;
      })
      .addCase(fetchAllSubjects.fulfilled, (state, action) => {
        state.isRefreshing = false;
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
        console.log(
          'User subjects from slice',
          action.payload.reg,
          action.payload.unreg,
        );
      })
      .addCase(fetchSubjectsForStudent.rejected, (state, action) => {
        state.errorMsg = action.error.message;
      });
    builder
      .addCase(addNewSubject.pending, (state, action) => {
        state.isRefreshing = true;
      })
      .addCase(addNewSubject.fulfilled, (state, action) => {
        state.isRefreshing = false;
      })
      .addCase(addNewSubject.rejected, (state, action) => {
        state.errorMsg = action.error.message;
      });
  },
});

export const {pickSubject, removeSubject, resetSubjects} = subjectSlice.actions;
export default subjectSlice.reducer;
