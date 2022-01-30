import * as React from 'react';   

import styles from '../Weather.module.scss';

import {IComponentProps} from './IComponentProps';

export default class Location extends React.Component<IComponentProps,{}> {  
    public Name:string;

    constructor(props:any) { 
        super(props);
        
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
        this.Name = data.name;
    }

    public render(): React.ReactElement {
        return( 
          <React.Fragment>  
            <span className={styles.location}>{this.Name}</span> 
          </React.Fragment>
        );
      }
 }