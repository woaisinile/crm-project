import Login from "./views/login/Login";
import Home from "./views/main/home/Home";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Login/>}/>
        <Route path={'home'} element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
