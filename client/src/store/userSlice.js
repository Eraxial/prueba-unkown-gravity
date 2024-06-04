import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user_id: "",
  email: "", 
  name: ""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { user_id, name, email } = action.payload;
      state.user_id = user_id;
      state.name = name;
      state.email = email;
    },
    logout: () => {
      return null
    },
  }
});

export const { addUser, logout } = userSlice.actions;
export default userSlice.reducer