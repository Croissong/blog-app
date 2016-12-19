import  * as baguetteBox from 'baguettebox.js';
import * as Prism from 'prismjs';
import { Component } from '@angular/core';

@Component({
  selector: 'blog-article',
  styleUrls: [ './article.component.css' ],
  templateUrl: './article.component.html'
})
export class ArticleComponent {

  constructor() {}

  ngOnInit() {
    Prism.highlightAll();
    baguetteBox.run('.baguette');
  }
}
