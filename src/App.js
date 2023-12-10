import './scss/app.scss';
import Header from "./components/Header";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import React from "react";
import NotFound from "./pages/NotFound";
import Card from "./pages/Card";

function App() {
  return (<div className="wrapper">
    <Header/>
    <div className="content">
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/cart'} element={<Card/>}/>
        <Route path={'*'} element={<NotFound/>}/>
      </Routes>
    </div>
  </div>);
}

export default App;
