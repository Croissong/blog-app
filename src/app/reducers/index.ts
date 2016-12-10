import { ActionReducer, Action } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';

export const counterReducer: ActionReducer<number> = (state: number = 0, action: Action) => {
  switch (action.type) {
  case INCREMENT:
    return state + 1;

  case DECREMENT:
    return state - 1;

  case RESET:
    return 0;

  default:
    return state;
  }
}

export interface AppState {
  counter: number;
}

export const reducers = combineReducers({
  counter: counterReducer
});
