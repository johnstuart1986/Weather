import * as React from 'react';

import { escape } from '@microsoft/sp-lodash-subset';  
import { WebPartContext } from '@microsoft/sp-webpart-base';  

import styles from './Weather.module.scss';  

import { WeatherService } from '../services/WeatherService';
import Location from '../classes/Location';
import Current from '../classes/Current';
import Forecast from '../classes/Forecast';

export interface IWeatherOverviewProps {  
  serviceProvider: WeatherService;
  metric:boolean;
  api:string;

  location: string;
  colour:string;
}  

export interface IWeatherState {  
  data:any;
} 
  
export default class WeatherOverview extends React.Component<IWeatherOverviewProps, IWeatherState> {  

    public constructor(props: IWeatherOverviewProps, state: IWeatherState) {  
        super(props);   
        
        this.state = { 
          data:null
        };  
    
    }  

    public render(): React.ReactElement {  

      if(this.state.data != null)
      {
        return(  
            <React.Fragment>  
              <div className={this.props.colour}> 
                <div className={styles.current}> 
                  <Location data={this.state.data.location} metric={this.props.metric} api={this.props.api}/>
                  <Current data={this.state.data.current} metric={this.props.metric} api={this.props.api}/>
                </div>
                <Forecast data={this.state.data.forecast} metric={this.props.metric} api={this.props.api}/>
              </div>
            </React.Fragment>  
        );  
      }

      return(  
          <React.Fragment>  
            <div>Loading</div>
          </React.Fragment>  
      );  
    }  
  
    public async componentDidMount(){  
        this.getData();  
    }  

    private getData(){  
        this.props.serviceProvider.getAPIData(this.props.location)
        .then(  
          (result: any): void => {  
             console.log(result);  

             this.setState({
                data:result
              }); 
          }  
        )  
        .catch(error => {  
          console.log(error);  
        });
    }  
}  