import Navbar from "../components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../views/Login/Login";
import { Home } from "../views/Home/Home";
import Register from "../views/Register/Register";
import { RegisterSuccess } from "../views/RegisterSuccess/RegisterSuccess";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <header>
        <Navbar />
      </header>
      <main mt="85px">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify/:token" element={<RegisterSuccess />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};
