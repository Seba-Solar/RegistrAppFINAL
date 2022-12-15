import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';
const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage {

  pageTitle: 'Clima';
  weatherTemp: any;
  todayDate = new Date();
  cityName: any;
  weatherIcon: any;
  weatherDetails: any;
  location: any;
  latitud: number;
  longitud: number;
  isNotHome = true;

  constructor(private httpClient: HttpClient) {
    this.loadData();
  }

  async loadData(){
    const location = await Geolocation.getCurrentPosition();
    this.latitud = location.coords.latitude;
    this.longitud = location.coords.longitude;
    this.httpClient.get(`${apiUrl}/weather?lat=${this.latitud}&lon=${this.longitud}&appid=${apiKey}`)
    .subscribe(results =>{
      console.log(results);
      this.weatherTemp = results['main'];
      this.cityName = results['name'];
      console.log(this.weatherTemp);
      this.weatherDetails = results['weather'][0];
      console.log(this.weatherDetails);
      this.weatherIcon = `http://openweathermap.org/img/wn/${this.weatherDetails.icon}@4x.png`;
      this.location = results['coord'];
      console.log(this.location);
    });
  }

}