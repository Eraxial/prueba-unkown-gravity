import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../views/Login/Login";
import { Home } from "../views/Home/Home";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import Register from "../views/Register/Register";



export const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('http://localhost:3000/users')
      .then(res => dispatch(addUser(res.data[0])))
      .catch(err => console.log(err))
  }, [])

  return (
    <BrowserRouter>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};
