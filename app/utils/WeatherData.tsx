export interface WeatherData {
    location: {
      name: string,
      region: string
    }
    current:{
      temp_f: number;
      condition: {
        icon: string,
        text: string
    }
    wind_mph: number,
    humidity: number,
    wind_dir: string,
    feelslike_f: number,
    pressure_mb: number,
    vis_km: number,
    }
    forecast: {
      forecastday: Array<{
        date:string,
        day: {
          maxtemp_f: number,
          mintemp_f: number,
          condition: {
            text: string,
            icon: string
          }
        }
        astro: {
          sunrise: string,
          sunset: string,
        }
      }>
    }
  }
  