import  * as baguetteBox from 'baguettebox.js';
import * as Prism from 'prismjs';
import { Component, trigger, state, style, transition, animate } from '@angular/core';

@Component({
  selector: 'blog-article',
  styleUrls: [ './article.component.css' ],
  templateUrl: './article.component.html',
  animations: [
    trigger('flyInOut', [
      state('void', style({'background-color': 'green'})),
      transition('void => *', [
        animate('100ms ease-in')
      ])
    ])
  ]
})
export class ArticleComponent {

  constructor() {}

  ngOnInit() {
    Prism.highlightAll();
    baguetteBox.run('.baguette');
  }
}
