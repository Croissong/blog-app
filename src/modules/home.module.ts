import { NgModule } from '@angular/core';
import { HomeComponent } from 'components/home';
import * as PostComponents from 'components/post';

@NgModule({
  bootstrap: [HomeComponent],
  declarations: [
    HomeComponent,
      ...Object.values(PostComponents)
  ]
})
export class HomeModule {}
