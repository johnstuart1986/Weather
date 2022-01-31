import * as React from 'react';

import { escape } from '@microsoft/sp-lodash-subset';

import styles from './Weather.module.scss';

import { IWeatherProps } from './IWeatherProps';
import WeatherOverview from './WeatherOverview';

export default class Weather extends React.Component<IWeatherProps, {}> {
  
  public render(): React.ReactElement<IWeatherProps> {
    switch(this.props.colour){
      case("red"):{
        return (
          <div className={[styles.weather, styles.red].join(' ')}>
            <WeatherOverview serviceProvider={this.props.weatherService} metric={this.props.metric} api={this.props.api} location={this.props.location}/>
          </div>
        );
      }
    }    
  }
}
