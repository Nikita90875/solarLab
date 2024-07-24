import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})

export class WeatherComponent implements OnInit {

  weatherData: any;

  constructor(public weatherService: WeatherService) {
    this.weatherService.getUserCity().subscribe(data => {
      this.weatherService.updateWeatherData(data.city);
    });
  }

  ngOnInit(): void {
    this.weatherService.weatherData$.subscribe(data => {
      this.weatherData = data;
    });

  }
}