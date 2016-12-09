import { Component } from '@angular/core';
import  * as baguetteBox from 'baguettebox.js';
import * as Prism from 'prismjs';

@Component({
  selector: 'home',
  providers: [], 
  styleUrls: [ './home.component.css' ], 
  templateUrl: './home.component.html'
})
export class HomeComponent {
  
  constructor() {}

  ngOnInit() {
    Prism.highlightAll();
    baguetteBox.run('.baguette');
  }
}
