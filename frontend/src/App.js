import React from "react";
import { Route, Routes } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Detail from "./components/Detail";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/product/:id" element={<Detail/>}/>
        <Route path="/addproduct" element={<AddProduct/>}/>
        <Route path="/editproduct" element={<EditProduct/>}/>
      </Routes>
    </div>
  );
}

export default App;
