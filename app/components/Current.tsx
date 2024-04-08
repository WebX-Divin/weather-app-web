import React from 'react';
import { getCurrentDate } from '../utils/CurrentDate';
import { WeatherData } from '../page';
import { CiLocationOn } from "react-icons/ci";

interface CurrentProps {
  data: WeatherData | null;
}

const Current: React.FC<CurrentProps> = ({ data }) => {
    const currentDate = getCurrentDate();
    const WeatherIcon = data?.current.condition.icon;
  return (
    <div className="flex flex-col mb-8 md:mb-0 items-start gap-2 w-1/2">
      <div className='flex items-center'>
        <div>
            <h1 className='text-3xl text-black font-bold'>Today</h1>
            <p className='text-black'>{currentDate}</p>
        </div>
        {WeatherIcon && (
            <div>
                <img src={WeatherIcon} className="w-[50px] object-cover" alt={data.current.condition.text} />
            </div>
        )}
      </div>
      <div>
      <p className='text-5xl text-black'>{data?.current.temp_f.toFixed()}
      <span>°</span>
      </p>
      <span className='text-black'>{data?.current.condition.text}</span>
      </div>
      <div>
        {data?.location ? (<div className='flex items-center text-black bg-white/90 px-2 py-2 rounded-xl'>
        <CiLocationOn />
        <span>{data.location.name}, {data.location.region}</span>
        </div> ) : null }
      </div>
    </div>
  );
};

export default Current;
