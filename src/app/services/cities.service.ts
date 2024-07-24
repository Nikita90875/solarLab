import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private apiUrl = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
  private apiKey = 'b79a4eba94d55539eb13a2f0f3d57a633308463f';

  activeCity: string = '';

  constructor(private http: HttpClient) { }

  getCitySuggestions(query: string): Observable<string[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${this.apiKey}`
    });

    const body = {
      query: query,
      from_bound: { value: 'city' },
      to_bound: { value: 'city' }
    };

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      map(response => {
        return response.suggestions.map((suggestion: { data: { city_with_type: any, city: any; }; }) => ({ name: suggestion.data.city_with_type, city: suggestion.data.city }));
      })
    );
  }

}
