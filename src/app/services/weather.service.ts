import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = 'eff801dd237301f68f0ab54720f65146';
  private _weatherData = new BehaviorSubject<any>(null);
  weatherData$ = this._weatherData.asObservable();
  
  constructor(private http: HttpClient) { }

  getWeatherByCity(city: string): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&lang=ru&units=metric`;
    return this.http.get<any>(url);
  }

  updateWeatherData(city: string): void {
    this.getWeatherByCity(city).subscribe(data => {
      console.log('Weather data received:', data);
      this._weatherData.next({ data, city });
    });
  }

  getUserCity(){
    const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=9d7775cda5b84c7b869dfeb84c617400`;
    return this.http.get<any>(url);
  }
}
