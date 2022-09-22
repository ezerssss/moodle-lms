import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ActivityInterface,
  ActivitySliceType,
} from '../interfaces/Redux/Activites';
import { RootState } from '../store/store';

const initialState: ActivitySliceType = {
  assign: [],
  forum: [],
  quiz: [],
};

const activitiesSlice = createSlice({
  name: 'activities',
  initialState: initialState,
  reducers: {
    setAssignments: (state, action: PayloadAction<ActivityInterface[]>) => {
      const { payload } = action;

      state.assign = [...state.assign, ...payload];
    },
    setForums: (state, action: PayloadAction<ActivityInterface[]>) => {
      const { payload } = action;

      state.forum = [...state.forum, ...payload];
    },
    setQuizzes: (state, action: PayloadAction<ActivityInterface[]>) => {
      const { payload } = action;

      state.quiz = [...state.quiz, ...payload];
    },
  },
});

export const { setAssignments, setForums, setQuizzes } =
  activitiesSlice.actions;
export const selectActivities = (state: RootState): ActivitySliceType =>
  state.activities;

export default activitiesSlice.reducer;
