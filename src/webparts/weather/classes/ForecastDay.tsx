import * as React from 'react';   

import styles from '../components/Weather.module.scss';

import {IComponentProps} from './IComponentProps';

enum Days {
  Sun,
  Mon,
  Tues,
  Wed,
  Thurs,
  Fri,
  Sat
}

export default class ForecastDay extends React.Component<IComponentProps,{}> { 
  private tempUnitOfMeasure:string;
  private speedUnitOfMeasure:string;

  private dayOfWeek:string;

  private AvgTemp:number;

  private ShowExtremes:boolean;
  private LowTemp:number;
  private HighTemp:number;

  private WindDirClass:string;
  private WindSpeed:number;

  private condition:string;
  private conditionCode:string;
  private conditionClass:string;

  getToday<T>(type: T, day: number): T[keyof T] {
    const casted = day as keyof T;
    return type[casted];
  }

  constructor(props:any) { 
      super(props);

      if(this.props.metric)
      {
          this.tempUnitOfMeasure = String.fromCharCode(176)+'C';
          this.speedUnitOfMeasure = 'kph';
      }
      else{
          this.tempUnitOfMeasure = String.fromCharCode(176)+'F';
          this.speedUnitOfMeasure = 'mph';
      }

      switch(this.props.api){
          case '1':{
              this.parseWeatherAPI();
              break;
          }
          default:{
              break;
          }
      }
  }

  private parseWeatherAPI():void{

    let date = new Date(this.props.data.date + " 12:00");
    this.dayOfWeek = this.getToday(Days, date.getDay()).toString();

    this.ShowExtremes = true;

    this.WindDirClass = "wi wi-towards-" + this.props.data.hour.wind_degree + "-deg";

    if(this.props.metric)
    {
        this.AvgTemp = this.props.data.day.avgtemp_c;
        this.HighTemp = this.props.data.day.maxtemp_c;
        this.LowTemp = this.props.data.day.mintemp_c;
        this.WindSpeed = this.props.data.day.maxwind_kph;
    }
    else{
        this.AvgTemp = this.props.data.day.avgtemp_f;
        this.HighTemp = this.props.data.day.maxtemp_f;
        this.LowTemp = this.props.data.day.mintemp_f;
        this.WindSpeed = this.props.data.day.maxwind_mph;
    }

    this.condition = this.props.data.day.condition.text;
    this.conditionCode = this.props.data.day.condition.code;
    this.conditionClass = "wi wi-wapi-";
    this.conditionClass += this.conditionCode;
  }

  public render(): React.ReactElement {
    return( 
      <React.Fragment>  
          <div className={styles.forecastDay}>
            <span>
              {this.dayOfWeek}
            </span>
            <i className={this.conditionClass} ></i>
            {!this.ShowExtremes &&
              <span>
                  {this.AvgTemp}
              </span>
            }
            {this.ShowExtremes &&
              <div className={styles.extremes}>
                  <div className={styles.low}>
                      <span>Low: {this.LowTemp}{this.tempUnitOfMeasure}</span>
                  </div>
                  <div className={styles.high}>
                      <span>High: {this.HighTemp}{this.tempUnitOfMeasure}</span>
                  </div>
              </div>
            }
            <div>
                <i className={this.WindDirClass}></i>
                <span>{this.WindSpeed} {this.speedUnitOfMeasure}</span>
            </div>
          </div>
      </React.Fragment>
    );
  }
 }