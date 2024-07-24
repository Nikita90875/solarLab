import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-list-saved',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './list-saved.component.html',
  styleUrl: './list-saved.component.css'
})
export class ListSavedComponent implements OnInit {

  constructor(private weatherService: WeatherService, public storageService: StorageService) { }

  ngOnInit(): void {
    this.storageService.setListData();
    console.log(this.storageService.listCities)
  }

  getItemCity(city: string) {
    this.weatherService.updateWeatherData(city)
  }

  deleteItem(keyItem: string) {
    this.storageService.removeItem(keyItem)
  }

}
