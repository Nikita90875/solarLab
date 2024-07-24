import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  listCities: any = '';

  constructor() { }

  saveItem(key: string, value: any): void {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
    this.setListData();
  }

  getItemsWithPrefix(prefix: string): { key: string, city: any }[] {
    const items: { key: string, city: any }[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        const value = localStorage.getItem(key);
        if (value) {
          try {
            items.push({ key, city: JSON.parse(value) });
          } catch {
            items.push({ key, city: value });
          }
        }
      }
    }
    return items;
  }
  
  countItemsWithPrefix(prefix: string): number {
    let count = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        count++;
      }
    }
    return count;
  }

  getItem<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value) as T;
      } catch {
        return value as any;
      }
    }
    return null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
    this.setListData();
  }

  clearAll(): void {
    localStorage.clear();
  }

  setListData(){
    this.listCities = this.getItemsWithPrefix('weatherCity')
  }
  
  cityExists(city: string): boolean {
    const cities = this.getItemsWithPrefix('weatherCity');
    return cities.some(item => item.city === city);
  }

}
