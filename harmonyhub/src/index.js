
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import Discover from "./components/Discover/Discover";
import "./index.css";
import "./input.css";

export default function App() {
  return(
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage/>} />
          <Route path='/discover' element={<Discover/>} />
        </Routes>
      </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
