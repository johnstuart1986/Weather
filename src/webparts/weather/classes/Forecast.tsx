import * as React from 'react';   

import styles from '../components/Weather.module.scss';

import {IComponentProps} from './IComponentProps';
import ForecastDay from './ForecastDay';

export default class Forecast extends React.Component<IComponentProps,{}> {  

    constructor(props:any) { 
        super(props);
    }

    public render(): React.ReactElement {
        return( 
          <React.Fragment>  
            <div className={styles.forecast} >
                {this.props.data.forecastday.map(c => <ForecastDay data={c} api={this.props.api} metric={this.props.metric}/>)}
            </div>
          </React.Fragment>
        );
      }
 }