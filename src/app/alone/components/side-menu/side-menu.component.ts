import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem{
  name  : string;
  router: string;
}

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  public menuItems: MenuItem[] = [
    {router: '/maps/fullscreen', name: 'FullScreen'},
    {router: '/maps/zoom-range', name: 'Zoom'},
    {router: '/maps/markets', name: 'Markets'},
    {router: '/maps/properties', name: 'Houses'},
    {router: '/alone', name: 'Alone Page'},
  ]

}
