import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, AboutComponent } from 'components';
import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { data: {name: 'Index'}, path: '',      component: HomeComponent },
  { data: {name: 'About'}, path: 'about', component: AboutComponent },
  {
    data: {name: 'Detail'}, path: 'detail',
    loadChildren: () => System.import('components/+detail')
      .then((comp: any) => comp.default),
  } 
];
