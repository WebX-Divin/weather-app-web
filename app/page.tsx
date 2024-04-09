"use client";
import Current from "./components/Current";
import Input from "./components/Input";
import React, {useState} from 'react';
import WeekForecast from "./components/WeekForecast";
import WeatherDetails from "./components/WeatherDetails";
//import CitiesTable from "./components/CitiesTable";
require('dotenv').config({ path: '.env.local' });
import { WeatherData } from './utils/WeatherData';

const Home:React.FC = () => {

  const [data, setData] = useState<WeatherData| null>(null);
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  //const apikey = process.env.API_KEY;

  const url = `https://api.weatherapi.com/v1/forecast.json?key=4945299d095b4d6fbfc32844240804&q=${location}&days=7&aqi=yes&alerts=yes`;

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
  };

  let content;
  if (!data && error === "") {
    content = (
      <div>
        <h2>Welcome to the Weather App</h2>
      </div>
    );
  } else if (error !== "") {
    content = (
      <div>
        <p>City not found</p>
        <p>Enter a valid city</p>
      </div>
    );
  } else {
    content = (
      <>
        <div className="flex md:flex-row flex-col p-12 items-center justify-between">
          <Current data={data}/>
          <WeekForecast data={data} />
        </div>
        <div>
          <WeatherDetails data={data}/>
        </div>
       
      </>
    );
  }
  

  return (
    <div className="bg-cover bg-gradient-to-t from-blue-400 to-grey-200 h-fit">
      <div className="bg-white/25 w-full flex flex-col h-fit">
        {/*Input and Logo*/}
        <div className="flex flex-col md:flex-row justify-between items-center p-12">
          <Input
          handleSearch={handleSearch}
          setLocation={setLocation}
          />
          <h1 className="text-black font-bold mb-8 md:mb-0 order-1 py-2 px-4 rounded-xl text-3xl font-sans">Weather App</h1>
        </div>
        {content}
      </div>
      
    </div>
  );
}

export default Home;
