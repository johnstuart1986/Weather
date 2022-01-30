declare interface IWeatherWebPartStrings {
  PropertyPaneDescription: string;

  APIGroupName: string;
  APILabel:string;
  APIKeyLabel: string;
  APIKeyDescription: string;

  DetailsGroupName: string;
  UnitOfMeasureKey: string;
  UnitOfMeasureLabel: string;
  UnitOfMeasureOnText: string;
  UnitOfMeasureOffText: string;
  LocationLabel: string;
  LocationDescription: string;
  ColourLabel:string;
  NumberOfDaysLabel: string;
}

declare module 'WeatherWebPartStrings' {
  const strings: IWeatherWebPartStrings;
  export = strings;
}
