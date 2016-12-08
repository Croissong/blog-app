import { Component, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';

import { ROUTES } from './app.routes';

import { AppState } from './app.service';
import '../init.css';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css' 
  ],
  templateUrl: './app.component.html'
})
export class AppComponent extends AfterViewInit {
  element: HTMLElement;
  routes = ROUTES;
  
  constructor(public appState: AppState, element: ElementRef) {
    super();
    this.element = element.nativeElement;
  }

  ngAfterViewInit() {
    console.log('Initial App State', this.appState.state);
    setTimeout(() => this.activate());
  }

  activate() {
    this.element.classList.remove('inactive');
    this.element.previousElementSibling.classList.add('inactive'); 
  }

}
