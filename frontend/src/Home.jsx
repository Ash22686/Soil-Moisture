import React from 'react'
import './App.css'
import Navbar from './Navbar';
import Form from './Form';
import Footer from './Footer';
import Team from './Team';
import Result from './Result';
import RainAndMoisture from './RainAndMoisture';
import MotorButton from "./Motor";

function Home() {
  return (
    <div className='overflow-hidden'>
      <div className='flex-col'>

       <div className='bg-black'> <Navbar />
        
      <div className="flex flex-col md:flex-row justify-between items-center ">
        
  <div className="text-white flex-col text-center md:text-left justify-center mt-10 md:mt-56 p-4 md:pl-10">
    <h1 className="text-3xl md:text-5xl pb-4 md:pb-8">Water Smarter, Grow Better</h1>
    <h1 className="text-[14px] md:text-[16px] pb-10 md:pb-16 md:pl-1">
      Precision irrigation powered by real-time rain and soil monitoring.
    </h1>
    {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button className="bg-custombutton rounded-sm h-12 md:h-16 w-48 md:w-60">
      Get Started
    </button>
  </div>
  <div className="w-full md:w-auto">
    <img src="main.png" alt="" className="h-[50vh] md:h-[85vh] w-full object-cover md:w-auto" />
  </div>
</div>
</div>


      
      

<div className="h-[75vh] w-screen flex flex-col justify-center items-center text-center px-4 md:px-20 lg:px-40 xl:px-[60vh] pt-10 md:pt-40]">
  <h1 className="text-2xl md:text-4xl font-semibold mb-6 md:mb-10 leading-relaxed">
    Transforming farming through smart irrigation.
  </h1>
  <p className="text-sm md:text-base leading-6">
    By using real-time moisture and rain monitoring, you’re not only ensuring optimal water usage but also contributing to sustainable farming practices that prioritize resource conservation and efficiency over wasteful methods.
  </p>
</div>


     <Form />

     <div className='flex bg-white justify-center pt-28 pb-20'>

     <RainAndMoisture />

      </div>

      <Result />


     <Team />

     
     <Footer />

    
    </div>
    
    </div>
    
  )
}

export default Home;

