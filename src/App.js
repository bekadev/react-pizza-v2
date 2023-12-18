import './scss/app.scss';
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import React from "react";
import NotFound from "./pages/NotFound";
import Card from "./pages/Card";
import FullPizza from "./pages/FullPizza";
import MainLayouts from "./layouts/MainLayouts";

function App() {

  return (
    <Routes>
      <Route path={'/'} element={<MainLayouts/>}>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/cart'} element={<Card/>}/>
        <Route path={'/pizza/:id'} element={<FullPizza/>}/>
        <Route path={'*'} element={<NotFound/>}/>
      </Route>
    </Routes>
  )
}

export default App;
