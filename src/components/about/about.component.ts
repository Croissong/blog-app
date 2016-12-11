import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { actions, AppState } from 'reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'about', 
  templateUrl: './about.component.html'
})
export class AboutComponent {
  counter: Observable<number>;
  
  constructor(private store: Store<AppState>) {
    this.counter = store.select(s => s.counter.get('1'));
  }

  increment(){
    this.store.dispatch(actions.increment(1));
  }

  decrement(){
    this.store.dispatch(actions.decrement(1));
  }

  reset(){
    this.store.dispatch(actions.reset());
  }
}
