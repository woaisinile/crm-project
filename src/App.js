import Login from "./views/login/Login";

import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import MainLayout from "./views/layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Login/>}/>
        <Route path={'mainlayout'} element={<MainLayout/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
