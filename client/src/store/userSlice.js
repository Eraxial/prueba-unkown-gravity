import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

let initialState = {
  user_id: "",
  email: "",
  name: "",
};

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const user_id = jwtDecode(token);
  console.log(token);
  await axios
    .get(`http://localhost:3000/users/${user_id.user_id}`)
    .then(res => {
      const { user_id, email, name } = res.data;
      initialState = {
        user_id: user_id,
        email: email,
        name: name,
      };
    })
    .catch(err => console.log(err));
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { user_id, name, email } = action.payload;
      state.user_id = user_id;
      state.name = name;
      state.email = email;
    },
    logout: state => {
      state.user_id = "";
      state.name = "";
      state.email = "";
    },
  },
});

export const { addUser, logout } = userSlice.actions;
export default userSlice.reducer;
