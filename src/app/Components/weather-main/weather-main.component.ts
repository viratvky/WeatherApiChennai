import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-main',
  templateUrl: './weather-main.component.html',
  styleUrls: ['./weather-main.component.css']
})
export class WeatherMainComponent implements OnInit {
  weatherdata:any;


  constructor() { }

  ngOnInit() {
  this.weatherdata={
    main:{},
    isDay:true
  };
  this.getweatherdata();
  console.log(this.weatherdata)
  }
  getweatherdata(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=chennai&appid=ff1bc4683fc7325e9c57e586c20cc03e')
    .then(response=>response.json())
    .then(data=>{this.setweatherdata(data);})
    
  }
  setweatherdata(data){
    this.weatherdata = data;
    let sunsetTime = new Date(this.weatherdata.sys.sunset * 1000);
    this.weatherdata.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.weatherdata.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.weatherdata.temp_celcius = (this.weatherdata.main.temp - 273.15).toFixed(0);
    this.weatherdata.temp_min = (this.weatherdata.main.temp_min - 273.15).toFixed(0);
    this.weatherdata.temp_max = (this.weatherdata.main.temp_max - 273.15).toFixed(0);
    this.weatherdata.temp_feels_like = (this.weatherdata.main.feels_like - 273.15).toFixed(0);

  }
}
