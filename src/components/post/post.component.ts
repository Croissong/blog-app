import { Component } from '@angular/core';
export * from './article';
export * from './toc';

@Component({
  selector: 'post', 
  styleUrls: [ './post.component.css' ], 
  templateUrl: './post.component.html'
})

export class PostComponent {
  
  constructor() {}

  ngOnInit() {}
}

