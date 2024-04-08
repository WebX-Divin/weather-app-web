"use client";
import Input from "./components/Input";
import React, {useState} from 'react';
require('dotenv').config({ path: '.env.local' });

interface WeatherData {
  current:{
    temp_c: number;
  }
}

const Home:React.FC = () => {

  const [data, setData] = useState<WeatherData| null>(null);
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  //const apikey = process.env.API_KEY;

  const url = `https://api.weatherapi.com/v1/forecast.json?key=4945299d095b4d6fbfc32844240804&q=${location}&days=5&aqi=yes&alerts=yes`;

  const handleSearch = async(e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter"){
      e.preventDefault();
      try{
        const response = await fetch(url);
        if(!response.ok){
          throw new Error();
        }
        const data = await response.json();
        setData(data);
        setLocation("");
        setError("");
      } catch (error){
        setError("City not found");
        setData(null);
      }
    }
  }

  return (
    <div className="bg-cover bg-gradient-to-t from-blue-400 to-grey-200 h-screen">
      <div className="bg-white/25 w-full flex flex-col h-full">
        {/*Input and Logo*/}
        <div className="flex flex-col md:flex-row justify-between items-center p-12">
          <Input
          handleSearch={handleSearch}
          setLocation={setLocation}
          />
          <h1 className="text-black font-bold mb-8 md:mb-0 order-1 py-2 px-4 rounded-xl text-3xl font-sans">Weather App</h1>
        </div>
        {data && data.current ? 
          <div>{data.current.temp_c}</div> 
          : null}
      </div>
    </div>
  );
}

export default Home;
