import * as React from 'react';


import { escape } from '@microsoft/sp-lodash-subset';

//import "../assets/css/weathericons/weather-icons.css"
//import "../assets/css/weathericons/weather-icons-wind.css"

import styles from "../assets/sass/Weather.module.scss";

import { IWeatherProps } from './IWeatherProps';
import WeatherOverview from './WeatherOverview';

export default class Weather extends React.Component<IWeatherProps, {}> {
    
  public render(): React.ReactElement<IWeatherProps> {
    return (
      <div className={[styles.weather].join(' ')}>
        <WeatherOverview serviceProvider={this.props.weatherService} metric={this.props.metric} api={this.props.api} location={this.props.location} colour={this.props.colour}/>
      </div>
    );   
  }
}
