import React from 'react'
import Home from './Home';
import Navbar from './Navbar';
import Form from './Form';
import Footer from './Footer';
import Team from './Team';
import Result from './Result';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RainAndMoisture from './RainAndMoisture';
import MotorButton from "./Motor";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Home />} />
      <Route path = "/navbar" element = {<Navbar />}/>
      <Route path = "/form" element = {<Form />}/>
      <Route path = "/footer" element = {<Footer />}/>
      <Route path = "/team" element = {<Team />}/>
      <Route path = "/rainandmoisture" element = {<RainAndMoisture />}/>
      <Route path = "/result" element = {<Result />}/>
      <Route path = "/motor" element = {<MotorButton />}/>
      

    </Routes>
    </BrowserRouter>
  )
}

export default App
