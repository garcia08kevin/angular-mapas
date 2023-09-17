import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker
}

interface PlainMarker{
  color:string;
  lntLag: number[]
}

@Component({
  selector: 'app-markets-page',
  templateUrl: './markets-page.component.html',
  styles: [
    `
    div{
      width: 100vw;
      height: 100vh;
    }

    button{
      position: fixed;
      bottom: 30px;
      right: 20px;
    }

    .list-group{
      position: fixed;
      top:20px;
      right: 20px;
      cursor:pointer;
    }

    `
  ]
})
export class MarketsPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];
  public zoom: number = 10;
  public map?: Map
  public currentCenter: LngLat = new LngLat(-74.5, 40);

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'Mapa no encontrado'
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.currentCenter,
      zoom: 10,
    });

    this.readFromLocalStorage();

    //crear marcador totalmente personalizado mediante html
    // const marketHtml = document.createElement('div');
    // marketHtml.innerHTML = 'Kevin Garcia'

    // const market = new Marker(
    //propiedades personalizables
    //   {
    //     element: marketHtml,
    //     color: 'red'
    //   }
    // ).setLngLat(this.currentCenter). addTo(this.map);
  }

  createMarker() {
    if (!this.map) throw 'Mapa no encontrado'
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const lngLat = this.map.getCenter();
    this.addMarker(lngLat, color);
  }

  flyTo({ marker }: MarkerAndColor) {
    if (!this.map) throw 'Mapa no encontrado'
    this.map?.flyTo({
      center: marker.getLngLat(),
      zoom: 14
    });
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) throw 'Mapa no encontrado'
    const marker = new Marker({
      color,
      //propiedad que permite mover el marcador
      draggable: true
    }).setLngLat(lngLat).addTo(this.map);
    this.markers.push({ color, marker });

    marker.on('dragend', () =>{
      this.saveToLocalStorage();
    })
    this.saveToLocalStorage();
  }

  saveToLocalStorage(){
    const plainMarkers: PlainMarker[] = this.markers.map(({color, marker}) => {
      return {
        color,
        lntLag: marker.getLngLat().toArray()
      }
    });
    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage(){
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkets:PlainMarker[] = JSON.parse(plainMarkersString);
    plainMarkets.forEach(({color, lntLag}) => {
      const [lng, lat] = lntLag
      this.addMarker(new LngLat(lng,lat), color);
    });
  }
}
