import { CoronaService } from './../service/corona.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  coronaData: any;
  country: any[] = [];
  countryIso: any[] = [];
  selectedCountry: string = "Vietnam";
  selectedCountryIso: string = "VN"
  countryData: any;
  latestData: any;
  // countryDataResult: {confirmed: number, recovered: number, deaths: number} = {confirmed: 0, recovered: 0, deaths: 0}

  constructor(private coronaService: CoronaService, private http: HttpClient) {
    this.coronaService.countryDataSubject.subscribe((response: any) => {
      this.countryData = response;
      // console.log(this.countryData);
      // this.countryDataResult = {confirmed: 0, recovered: 0, deaths: 0};
      // this.countryData.forEach((element: any) => {
      //   this.countryDataResult.confirmed += element.confirmed;
      //   this.countryDataResult.recovered += element.recovered;
      //   this.countryDataResult.deaths += element.deaths;
      // });
    })
  }

  ngOnInit(): void {
    this.coronaService.getBrief().subscribe((response: any) => {
      this.coronaData = response;
    });
    // this.selectedCountry = this.coronaService.getSelectedCountry();
    this.coronaService.getLatestData().subscribe((response: any) => {
      response.forEach((element: any) => {
        this.country.push(element.countryregion);
        this.countryIso.push(element.countrycode);
      });
      // console.log(this.country);
      // console.log(this.countryIso);
    });
    // lấy countryData cho VN
    // this.countryData = this.http.get('https://master-covid-19-api-laeyoung.endpoint.ainize.ai/jhu-edu/latest?iso2=VN').subscribe((response: any) => {
    //   this.countryData = response;
    //   // this.countryDataResult = {confirmed: 0, recovered: 0, deaths: 0};
    //   // this.countryData.forEach((element: any) => {
    //   //   this.countryDataResult.confirmed += element.confirmed;
    //   //   this.countryDataResult.recovered += element.recovered;
    //   //   this.countryDataResult.deaths += element.deaths;
    //   // });
    // })
    this.coronaService.getDataByCode('VN');
    console.log(this.countryData);
    

    this.selectedCountryIso = this.countryIso[this.country.indexOf(this.selectedCountry)]?.iso2;
  }

  changeCountry() {
    // this.coronaService.setSelectedCountry(this.selectedCountry);
    if(this.countryIso[this.country.indexOf(this.selectedCountry)] === undefined) {
      this.selectedCountryIso = 'none';
      this.coronaService.getDataByName(this.selectedCountry);
      this.coronaService.getTimeseriesByName(this.selectedCountry);
    }else {
      this.selectedCountryIso = this.countryIso[this.country.indexOf(this.selectedCountry)].iso2;
    this.coronaService.getDataByCode(this.selectedCountryIso);
    this.coronaService.getTimeseriesByCode(this.selectedCountryIso);
    // console.log(this.countryIso[this.country.indexOf(this.selectedCountry)].iso2);
    }
  }

}
