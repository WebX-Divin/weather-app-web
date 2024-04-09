import { WeatherData } from '../utils/WeatherData';

interface WeekForecastProps {
    data: WeatherData | null;
  }
  

const WeekForecast:React.FC<WeekForecastProps> = ({data}) => {
    return(
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 w-full'>
            {data?.forecast.forecastday.map((day, index) => (
                <div key={index} className='bg-white/40 p-2 text-center rounded-lg flex flex-col items-center'>
                    <p>{new Date(day.date).toLocaleString("en-us", {weekday: "short"})}</p>
                    <img src={day.day.condition.icon} alt={day.day.condition.text} />
                    <div>
                        <p>High {day.day.maxtemp_f.toFixed()}°</p>
                        <p>Low {day.day.mintemp_f.toFixed()}°</p>
                    </div>
                </div>
            ))}
            
        </div>
    )
};

export default WeekForecast;