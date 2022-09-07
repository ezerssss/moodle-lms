import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthSliceInterface } from '../interfaces/Redux/Auth';
import { RootState } from '../store/store';

const initialState: AuthSliceInterface = {
  moodleBaseURL: '',
  token: '',
  password: '',
  username: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<AuthSliceInterface>) => {
      const { moodleBaseURL, token, password, username } = action.payload;

      state.moodleBaseURL = moodleBaseURL;
      state.token = token;
      state.password = password;
      state.username = username;
    },
  },
});

export const { setAuthState } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
