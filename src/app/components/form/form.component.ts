import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CitiesService } from '../../services/cities.service';
import { WeatherService } from '../../services/weather.service';
import { StorageService } from '../../services/storage.service';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ButtonModule, AutoCompleteModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  countries: any[] = [];
  formGroup: FormGroup;
  filteredCountries: any[] = [];
  weatherDataSubscription: Subscription;

  constructor(private citiesService: CitiesService, public weatherService: WeatherService, private storageService: StorageService) {
    this.formGroup = new FormGroup({
      selectedCountry: new FormControl<object | null>(null)
    });

    this.weatherDataSubscription = this.weatherService.weatherData$.subscribe(data => {
      if (data) {
        console.log('Weather data in FormComponent:', data);
      }
    });
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    let query = event.query.toLowerCase();
    this.citiesService.getCitySuggestions(query).subscribe(cities => {
      this.filteredCountries = cities;
    });
  }

  setWeather() {
    let city = this.formGroup.get('selectedCountry')?.value;
    this.citiesService.activeCity = city.city;
    this.weatherService.updateWeatherData(city.city);
  }

  saveWeather(): void {
    const city = this.formGroup.get('selectedCountry')?.value.city;

    if (!this.storageService.cityExists(city)) {
      let count = this.storageService.countItemsWithPrefix('weatherCity');
      const newKey = `weatherCity-${count + 1}`;

      this.storageService.saveItem(newKey, { city });
    } else {
      console.log('City already exists in storage.');
    }
  }

  ngOnDestroy() {
    if (this.weatherDataSubscription) {
      this.weatherDataSubscription.unsubscribe();
    }
  }
}
