"use client";
import React, { useState } from 'react';
import Current from './components/Current';
import WeekForecast from './components/WeekForecast';
import WeatherDetails from './components/WeatherDetails';
import CitiesTable, { City } from './components/CitiesTable';
import { WeatherData } from './utils/WeatherData';

const Home: React.FC = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');
  const [showCitiesTable, setShowCitiesTable] = useState(true);

  const url = (location: string) =>
    `https://api.weatherapi.com/v1/forecast.json?key=4945299d095b4d6fbfc32844240804&q=${location}&days=7&aqi=yes&alerts=yes`;

  const fetchWeatherData = async (location: string) => {
    try {
      const response = await fetch(url(location));
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      setData(data);
      setError('');
    } catch (error) {
      setError('City not found');
      setData(null);
    }
  };

  const handleCitySelect = (city: City) => {
    setShowCitiesTable(false);
    fetchWeatherData(city.name);
  };

  const content = showCitiesTable ? (
    <CitiesTable onCitySelect={handleCitySelect} />
  ) : (
    <>
      <div className="flex md:flex-row flex-col p-12 items-center justify-between">
        <Current data={data} />
        <WeekForecast data={data} />
      </div>
      <div>
        <WeatherDetails data={data} />
      </div>
    </>
  );

  return (
    <div className="bg-cover bg-gradient-to-t from-blue-400 to-grey-200 h-fit">
      <div className="bg-white/25 w-full flex flex-col h-fit">
        {/* Input and Logo */}
        <div className="flex flex-col md:flex-row justify-between items-center p-12">
          <h1 className="text-black font-bold mb-8 md:mb-0 order-1 py-2 px-4 rounded-xl text-3xl font-sans">
            Weather App
          </h1>
        </div>
        {content}
      </div>
    </div>
  );
};

export default Home;