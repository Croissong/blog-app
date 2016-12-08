import { Component } from '@angular/core';
import  * as baguetteBox from 'baguettebox.js';
import * as Prism from 'prismjs';
import { AppState } from '../app.service';
import { Title } from './title';
import { XLarge } from './x-large';

@Component({
  selector: 'home',
  providers: [
    Title
  ], 
  styleUrls: [ './home.component.css' ], 
  templateUrl: './home.component.html'
})
export class HomeComponent {
  
  constructor(public appState: AppState, public title: Title) { 
  }

  ngOnInit() {
    Prism.highlightAll();
    baguetteBox.run('.baguette'); 
  }
}
