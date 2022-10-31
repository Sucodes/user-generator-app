import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./components/404/NotFound";
import Header from './components/header/Header';
import Users from './components/users/Users';

function App() {
  return (
      <main className="container">
      <Routes>
        <Route path="/" element={<Header/>}></Route>
        <Route path="/users" element={<Users/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </main>
  );
}

export default App;
