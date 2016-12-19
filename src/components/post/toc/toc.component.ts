import * as tocbot from 'tocbot';
import * as anchor from 'anchor-js';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'toc',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './toc.component.css' ],
  templateUrl: './toc.component.html'
})
export class TocComponent {

  constructor() {}

  ngOnInit() {
    tocbot.init({
      tocSelector: 'toc',
      contentSelector: 'article',
      headingSelector: 'h1, h2, h3',
      positionFixedSelector: 'toc'
    });

    new anchor().add('h2, h3');
  }
}
