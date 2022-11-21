import {configureStore} from '@reduxjs/toolkit';
import studentReducer from '../features/student/studentSlice';
import subjectReducer from '../features/student/subjectSlice';

export const store = configureStore({
  reducer: {
    student: studentReducer,
    subject: subjectReducer,
  },
});
