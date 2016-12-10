import { ActionReducer, Action, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { fromJS, Map } from 'immutable';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';
export const SET_ROOT_STATE = 'SET_ROOT_STATE';


export const initial_state: AppState = Object.entries((<any>window).initial_state)
  .reduce((state: AppState, [key, val]) => ({...state, [key]: fromJS(val)}),
          (<AppState>{}));

export interface AppState {
  counter: Map<string, any>;
}

// Generate a reducer to set the root state in dev mode for HMR
const stateSetter: ActionReducer<any> = (reducer: ActionReducer<any>) =>
  (state, action) => {
    if (action.type === SET_ROOT_STATE) {
      return action.payload;
    }
    return reducer(state, action);
  };

const counter: ActionReducer<Map<string, any>> = (state: Map<string, any>, action: Action) => {
  switch (action.type) {
  case INCREMENT:
    return state.update('1', v => v + 1);

  case DECREMENT:
    return state.update('1', v => v - 1);

  case RESET:
    return state.update('1', v => 0);

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
