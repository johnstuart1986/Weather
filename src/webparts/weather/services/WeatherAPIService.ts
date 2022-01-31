import { HttpClient, IHttpClientOptions } from '@microsoft/sp-http';  
import { WebPartContext } from '@microsoft/sp-webpart-base';

import {WeatherService} from "./WeatherService";

export class WeatherAPIService extends WeatherService{

    private httpClientOptionsForGlobal: IHttpClientOptions = {  
        headers: new Headers({  
            //'key':'value' 
        }),  
        method: "GET"//,  
        //mode: "cors"  
    };  
    
    public async getAPIData(location: string){
        var response = await this.wpcontext.httpClient
        .get(
            'https://api.weatherapi.com/v1/forecast.json?key='+this.apiKey+'&q=' + location + '&days=' + this.days + '&hour=12&aqi=no&alerts=no', 
            HttpClient.configurations.v1,
            this.httpClientOptionsForGlobal
        );

        var responeJson = await response.json();  

        return responeJson; 
      }
}