import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { INCREMENT, DECREMENT, RESET, AppState } from 'app/reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'about', 
  templateUrl: './about.component.html'
})
export class AboutComponent {
  counter: Observable<number>;
  
  constructor(private store: Store<AppState>) {
    this.counter = store.select(s => s.counter);
  }

  increment(){
    this.store.dispatch({ type: INCREMENT });
  }

  decrement(){
    this.store.dispatch({ type: DECREMENT });
  }

  reset(){
    this.store.dispatch({ type: RESET });
  }
}
