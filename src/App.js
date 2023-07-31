import Login from "./views/login/Login";

import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import MainLayout from "./views/layout/MainLayout";
import MarketActivity from "./views/marketActivity/MarketActivity"

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path={'/'} element={<Login/>}/>
          <Route path={'main-layout'} element={<MainLayout/>}/>
          <Route path={'market-activity'} element={<MarketActivity/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
