import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoronaService {
  endpoint: string = "https://master-covid-19-api-laeyoung.endpoint.ainize.ai";
  briefSubject= new Subject();
  selectedCountry: string = 'Vietnam';
  latestData: any;
  countryData: any[] = [];
  countryDataSubject = new Subject();
  timeseriesSubject = new Subject();
  allTimeseriesData: any;
  timeseriesData: any[] = [];

  constructor(private http: HttpClient) { }

  getBrief() {
    this.http.get(this.endpoint + '/jhu-edu/brief').subscribe((response: any) => {
      this.briefSubject.next(response);
    });
    return this.http.get(this.endpoint + '/jhu-edu/brief');
  }

  getLatestData() {
    return this.http.get(this.endpoint + '/jhu-edu/latest?onlyCountries=true');
  }

  getSelectedCountry() {
    return this.selectedCountry;
  }

  // setSelectedCountry(country: string) {
  //   if (country.trim() === '') return;
  //   this.selectedCountry = country;
  //   // console.log(country);
    
  // }

  getDataByName(name: string) {
    if (name.trim() === '') return;
    this.getLatestData().subscribe((response: any) => {
      this.latestData = response;
      this.latestData.forEach((element: any) => {
        if(element.countryregion === name) {
          this.countryData = [];
          this.countryData.push(element)
          this.countryDataSubject.next(this.countryData);
        }
      });
    });
      
  }

  getDataByCode(iso2: string) {
    if (iso2.trim() === '') return;
    this.http.get(this.endpoint + '/jhu-edu/latest?iso2=' + iso2 + '&onlyCountries=true').subscribe((response: any) => {
      this.countryDataSubject.next(response);
    })
  }

  getAllTimeseries() {
    return this.http.get(this.endpoint + '/jhu-edu/timeseries?onlyCountries=true');
  }

  getTimeseriesByName(name: string) {
    if (name.trim() === '') return;
    this.getAllTimeseries().subscribe((response: any) => {
      this.allTimeseriesData = response;
      this.allTimeseriesData.forEach((element: any) => {
        if(element.countryregion === name) {
          this.timeseriesData = [];
          this.timeseriesData.push(element)
          this.timeseriesSubject.next(this.timeseriesData);
        }
      });
    });
  }

  getTimeseriesByCode(iso2: string) {
    if (iso2.trim() === '') return;
    this.http.get(this.endpoint + '/jhu-edu/timeseries?iso2=' + iso2 + '&onlyCountries=true').subscribe((response: any) => {
      this.timeseriesSubject.next(response);
    })
  }
}
