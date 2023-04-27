import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: null,
  },
  reducers: {
    signin: (state, action) => {
      state.value = action.payload;
    },
    signout: (state) => {
      state.value = false;
    },
  },
});

export const { signin, signout } = userSlice.actions;

export const selectUser = (state) => state.user.value;

export default userSlice.reducer;
