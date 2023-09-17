import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';


@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styles: [
    `
    div{
      width: 100%;
      height: 150px;
      margin: 0px;
    }
    `
  ]
})
export class MiniMapComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  public map?: Map
  @Input() lngLat? :[number,number]

  ngAfterViewInit(): void {
    if (!this.lngLat) throw 'Coordenadas no encontradas'
    if (!this.divMap) throw 'Mapa no encontrado'
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: 15,
      interactive: false
    });
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    new Marker({
      color,
    }).setLngLat(this.lngLat).addTo(this.map);

  }
}
