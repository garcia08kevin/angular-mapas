import { Component } from '@angular/core';
import { CounterAloneComponent } from '../../components/counter-alone/counter-alone.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  standalone: true,
  imports: [
    SideMenuComponent,
    CounterAloneComponent
  ],
  templateUrl: './alone-page.component.html',
  styles: [
  ]
})
export class AlonePageComponent {

}
