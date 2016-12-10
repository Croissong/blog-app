import { ActionReducer, Action, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';
export const SET_ROOT_STATE = 'SET_ROOT_STATE';

export interface AppState {
  counter: number;
}

// Generate a reducer to set the root state in dev mode for HMR
const stateSetter: ActionReducer<any> = (reducer: ActionReducer<any>) =>
  (state, action) => {
    if (action.type === SET_ROOT_STATE) {
      return action.payload;
    }
    return reducer(state, action);
  };

const counter: ActionReducer<number> = (state: number = 0, action: Action) => {
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

const reducers = {
  counter
};

const developmentReducer = compose(stateSetter, combineReducers)(reducers);
const productionReducer = compose(combineReducers)(reducers);

export const rootReducer = (state: any, action: any) => 
  ENV !== 'development' ? productionReducer(state, action) : developmentReducer(state, action);
