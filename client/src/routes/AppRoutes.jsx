import Navbar from "../components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../views/Login/Login";
import { Home } from "../views/Home/Home";
import Register from "../views/Register/Register";
import { RegisterSuccess } from "../views/RegisterSuccess/RegisterSuccess";
import { RegisterValidate } from "../views/RegisterValidate/RegisterValidate";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/successful" element={<RegisterValidate />} />
          <Route path="/verify/:token" element={<RegisterSuccess />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};
