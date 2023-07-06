import React from "react";
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "../views/login/Login";
import MainIndex from "../views/main/MainIndex";
import Home from "../views/main/home/Home";

export default function IndexRouter() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        localStorage.getItem("token") ? (
                            <MainIndex />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route path="/ss" element={<Home/>}></Route>
            </Routes>
        </HashRouter>
    );
}
