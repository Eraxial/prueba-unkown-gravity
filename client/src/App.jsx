
import { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Home } from './views/Home/Home';
import { AppRoutes } from './routes/AppRoutes';


function App() {

  return (
 
        <AppRoutes />

  )
}

export default App
