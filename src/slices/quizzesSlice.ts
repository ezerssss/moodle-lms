import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CourseSliceInterface } from '../interfaces/Redux/Courses';
import { RootState } from '../store/store';

const initialState: { courses: CourseSliceInterface[] } = {
  courses: [],
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState: initialState,
  reducers: {
    setCourseState: (state, action: PayloadAction<CourseSliceInterface[]>) => {
      const { payload } = action;

      state.courses = payload;
    },
  },
});

export const { setCourseState } = coursesSlice.actions;
export const selectCourses = (
  state: RootState,
): { courses: CourseSliceInterface[] } => state.courses;

export default coursesSlice.reducer;
