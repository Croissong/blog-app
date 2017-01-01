import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTES } from './app.routes';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  routes = ROUTES;
}
