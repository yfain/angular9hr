import {Component, OnInit} from '@angular/core';
import {Observable, EMPTY} from 'rxjs';
import {FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {catchError, debounceTime, switchMap} from "rxjs/operators";

@Component({
  selector: "app-root",
  template: `
    <h2>Observable weather</h2>
    <input type="text" placeholder="Enter city" [formControl]="searchInput">
    <h3>{{weather}}</h3>
  `
})
export class AppComponent implements OnInit{
  private baseWeatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
  private urlSuffix = "&units=imperial&appid=d6c1dad3b2dd811ec34e5142a466f21b";

  searchInput = new FormControl();
  weather: string;

  constructor(private http:HttpClient){ }

  ngOnInit(){
    this.searchInput.valueChanges
      .pipe(debounceTime(200),
            switchMap(city => this.getWeather(city))
      )
      .subscribe(
        res => {
          this.weather =
            `Current temperature is  ${res['main'].temp}F, ` +
            `humidity: ${res['main'].humidity}%`;
        },
        err => console.log(`Can't get weather. Error code: %s, URL: %s`, err.message, err.url)
      );
  }

  getWeather(city: string): Observable<any> {
    return this.http.get(this.baseWeatherURL + city + this.urlSuffix)
      .pipe(
        catchError( err => {
        if (err.status ===404){
          console.log(`City ${city} not found`) ;
          return EMPTY}
         })
      );
  }
}
