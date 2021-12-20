import { CoronaService } from './../service/corona.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  timeseriesData: any;
  selectedTimeseries: any[] = [];
  multi: any[] = [];

  constructor(private coronaService: CoronaService, private http: HttpClient) {
    
  }

  ngOnInit(): void {
    this.coronaService.getTimeseriesByCode('VN');
    this.coronaService.timeseriesSubject.subscribe((response: any) => {
      this.timeseriesData = response;
      console.log(this.timeseriesData);
      this.selectedTimeseries = [];
      for (const [key, value] of Object.entries(this.timeseriesData[0].timeseries)) {
        this.selectedTimeseries.push({'key': key, 'value': value})
      }
      console.log(this.selectedTimeseries);
      this.multi = [
        { name: 'Confirmed', series: [] },
        { name: 'Deaths', series: [] },
        { name: 'Recovered', series: [] },
      ];
      for (let index = this.selectedTimeseries.length - 1; index > this.selectedTimeseries.length - 15 && index > 0; index--) {
        this.multi[0].series.unshift({'value': this.selectedTimeseries[index].value.confirmed, 'name': this.selectedTimeseries[index].key});
        this.multi[1].series.unshift({'value': this.selectedTimeseries[index].value.deaths, 'name': this.selectedTimeseries[index].key});
        this.multi[2].series.unshift({'value': this.selectedTimeseries[index].value.recovered, 'name': this.selectedTimeseries[index].key});
      }
      console.log(this.multi);
      
      
    });
  }

  view: [number, number] = [800, 500];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Case(s)';
  timeline: boolean = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
}
