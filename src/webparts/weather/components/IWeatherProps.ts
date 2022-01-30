import { WeatherService } from "./services/WeatherService";

export interface IWeatherProps {  
  api: string;
  weatherService: WeatherService;

  metric: boolean;
  location:string;
  colour:string;
}
