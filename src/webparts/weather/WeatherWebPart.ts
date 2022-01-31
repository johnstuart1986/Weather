import * as React from 'react';
import * as ReactDom from 'react-dom';

import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneDropdown,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'WeatherWebPartStrings';

import Weather from './components/Weather';
import { IWeatherProps } from './components/IWeatherProps';
import { WeatherService } from './services/WeatherService';
import { WeatherAPIService } from './services/WeatherAPIService';
import styles from './components/Weather.module.scss';

export interface IWeatherWebPartProps {
  api: string;
  apiKey: string;

  metric: boolean;
  location: string;
  colour: string;
  numberOfDays: number;  
}

export default class WeatherWebPart extends BaseClientSideWebPart<IWeatherWebPartProps> {

  private weatherService: WeatherService;

  protected onInit(): Promise<void> {
    
    switch(this.properties.api){
      case '0':{
        this.weatherService = null;
        break;
      }
      case '1':{
        this.weatherService = new WeatherAPIService(this.context, this.properties.apiKey, this.properties.numberOfDays, this.properties.metric);
        break;
      }
      default:{
        break;
      }
    }

    return Promise.resolve();
  }

  public render(): void {
    const element: React.ReactElement<IWeatherProps> = React.createElement(
      Weather,
      {
        weatherService: this.weatherService,
        api: this.properties.api,
        metric: this.properties.metric,
        location: this.properties.location,
        colour: this.properties.colour
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  private validateAPIKey(value: string): string {
    if (value === null ||
      value.trim().length === 0) {
      return 'Provide an API Key';
    }
    
    return '';
  }

  private validateLocation(value: string): string {
    if (value === null ||
      value.trim().length === 0) {
      return 'Provide a Location';
    }
    
    return '';
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.APIGroupName,
              groupFields: [
                PropertyPaneDropdown('api', {
                  label: strings.APILabel, 
                  disabled: false,
                  options: [
                    { key: '0', text: '<Select an API>' },
                    { key: '1', text: 'WeatherAPI - https://www.weatherapi.com/' }
                  ],
                  selectedKey: '0'
                }),
                PropertyPaneTextField('apiKey', {
                  label: strings.APIKeyLabel,
                  description: strings.APIKeyDescription,
                  onGetErrorMessage: this.validateAPIKey.bind(this)
                })
              ]
            },
            {
              groupName: strings.DetailsGroupName,
              groupFields:[
                PropertyPaneToggle('metric', {
                  key: strings.UnitOfMeasureKey,
                  label: strings.UnitOfMeasureLabel,
                  onText: strings.UnitOfMeasureOnText,
                  offText: strings.UnitOfMeasureOffText
                }),
                PropertyPaneTextField('location', {
                  label: strings.LocationLabel,
                  description: strings.LocationDescription,
                  onGetErrorMessage: this.validateLocation.bind(this)
                }),
                PropertyPaneDropdown('colour', {
                  label: strings.ColourLabel, 
                  disabled: false,
                  options: [
                    { key: 'red', text: 'Red' }
                  ],
                  selectedKey: 'red'
                }),
                PropertyPaneSlider('numberOfDays', {
                  label: strings.NumberOfDaysLabel,  
                  min: 0, 
                  max: 3, 
                  step: 1, 
                  showValue: true, 
                  value: 0 
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
