import { CoronaService } from '../../service/corona.service';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  latestData: any;

  constructor(private coronaService: CoronaService) {}

  ngOnInit(): void {
    this.coronaService.getLatestData().subscribe((response: any) => {
      this.latestData = response;
    });
    setTimeout(() => {
      this.latestData.forEach((element: any) => {
        this.layers.push(
          L.circle([element.location.lat, element.location.lng], {
            radius: Number(element.confirmed) / 16,
            opacity: 0,
            fillColor: 'red',
            weight: 1,
          })
        );
      });
    }, 1000);
  }

  corner1 = L.latLng(-90, -200);
  corner2 = L.latLng(90, 200);
  bounds = L.latLngBounds(this.corner1, this.corner2);

  // layersControlOptions = { position: 'bottomright' };
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 1,
        maxZoom: 10,
        attribution: 'Open Street Map',
      }),
    ],
    zoom: 1,
    maxBounds: this.bounds,
    maxBoundsViscosity: 1.0,
    center: L.latLng(10, 15),
  };
  layers: L.Circle[] = [];
  
}
