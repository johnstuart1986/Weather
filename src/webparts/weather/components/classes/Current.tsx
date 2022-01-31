import * as React from 'react';  

import styles from "../Weather.module.scss";
import iconStyles from '../../weathericons/sass/weather-icons.scss';

import {IComponentProps} from './IComponentProps';

export default class Current extends React.Component<IComponentProps,{}> {  
    private tempUnitOfMeasure:string;
    private speedUnitOfMeasure:string;

    private CurrentTemp:number;

    private ShowExtremes:boolean;
    private HighTemp:number;
    private LowTemp:number;

    private WindDir:number;
    private WindDirClass:string;
    private WindSpeed:number;

    private isDay:number;
    private condition:string;
    private conditionCode:string;
    private conditionClass:string;

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
                this.parseWeatherAPI(this.props.data);
                break;
            }
            default:{
                break;
            }
        }
    }

    private parseWeatherAPI(data:any):void{
        //WeatherAPI doesnt have highs and lows for the day
        this.ShowExtremes = false;
        this.HighTemp = 0;
        this.LowTemp = 0;
        this.WindDir = data.wind_degree;
        this.WindDirClass = "wi wi-towards-" + this.WindDir + "-deg";

        if(this.props.metric)
        {
            this.CurrentTemp = data.temp_c;
            this.WindSpeed = data.wind_kph;
        }
        else{
            this.CurrentTemp = data.temp_f;
            this.WindSpeed = data.wind_mph;
        }
        
        this.isDay = data.is_day;
        this.condition = data.condition.text;
        this.conditionCode = data.condition.code;
        this.conditionClass = "wi wi-";
        if (this.isDay){
            this.condition += "day-"
        }
        else{
            this.condition += "night-"
        }
    }

    public render(): React.ReactElement {
        return( 
          <React.Fragment>  
            <i className={this.conditionClass} ></i>
            <div className={styles.temp}>
                <span>{this.CurrentTemp}{this.tempUnitOfMeasure}</span>
            </div>
            {this.ShowExtremes &&
                <div className={styles.extremes}>
                    <div className={styles.low}>
                        <span>Low: {this.LowTemp}{this.tempUnitOfMeasure}</span>
                    </div>
                    <div className={styles.high}>
                        <span>High: {this.HighTemp}{this.tempUnitOfMeasure}</span>
                    </div>
                    Show Extremes
                </div>
            }
            <div className={styles.wind}>
                <i className={this.WindDirClass}></i>
                <span>{this.WindSpeed} {this.speedUnitOfMeasure}</span>
            </div>
          </React.Fragment>
        );
      }
 }