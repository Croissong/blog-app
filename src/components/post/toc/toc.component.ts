import * as tocbot from 'tocbot';
import * as anchor from 'anchor-js';
import { Component, ViewEncapsulation, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'toc',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './toc.component.css' ],
  templateUrl: './toc.component.html'
})
export class TocComponent implements AfterViewInit, OnDestroy{

  constructor() {}

  ngAfterViewInit() {
    tocbot.init({
      tocSelector: 'toc',
      contentSelector: 'article',
      headingSelector: 'h1, h2, h3',
      positionFixedSelector: 'toc'
    });

    new anchor().add('h2, h3');
  }

  ngOnDestroy() {
    tocbot.destroy()
  }
}
