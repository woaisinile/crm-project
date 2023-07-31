import Login from "./views/login/Login";

import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import MainLayout from "./views/layout/MainLayout";
import MainRole from "./views/mainRole/MainRole"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Login/>}/>
          <Route path={'main-layout'} element={<MainLayout/>}/>
          <Route path={'main-role'} element={<MainRole/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
