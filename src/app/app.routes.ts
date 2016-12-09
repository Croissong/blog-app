import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { data: {name: 'Index'}, path: '',      component: HomeComponent },
  { data: {name: 'About'}, path: 'about', component: AboutComponent },
  {
    data: {name: 'Detail'}, path: 'detail',
    loadChildren: () => System.import('./+detail')
                              .then((comp: any) => comp.default),
  } 
];
