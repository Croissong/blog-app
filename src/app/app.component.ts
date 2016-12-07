import { Component, ViewEncapsulation } from '@angular/core';

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
export class AppComponent {
  constructor(
    public appState: AppState) {
  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}
