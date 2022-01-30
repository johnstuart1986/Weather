import { HttpClient, IHttpClientOptions } from '@microsoft/sp-http';  
import { WebPartContext } from '@microsoft/sp-webpart-base';

export class WeatherService {  
    protected wpcontext:WebPartContext;  
    protected apiKey:string;
    protected days:number;
    protected celcius:boolean;

    public constructor(context: WebPartContext, aK: string, d:number, c:boolean) {  
       this.wpcontext= context;  
       this.apiKey = aK;
       this.days = d;
       this.celcius = c;
    }  
    
    public async getAPIData(location: string){
    }
} 