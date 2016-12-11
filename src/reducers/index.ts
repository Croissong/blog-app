import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { fromJS, Map } from 'immutable';
import { stateSetter, setRootState } from './hmr';
import { counterActions, counter } from './counter';

export const initial_state: AppState = Object.entries((<any>window).initial_state)
  .reduce((state: AppState, [key, val]) => ({...state, [key]: fromJS(val)}),
          (<AppState>{}));


export const actions = { ...counterActions, setRootState};

export interface AppState {
  counter: Map<string, any>;
}

const reducers = {
  counter
};

const developmentReducer = compose(stateSetter, combineReducers)(reducers);
const productionReducer = compose(combineReducers)(reducers);

export const rootReducer = (state: any, action: any) => 
  ENV !== 'development' ? productionReducer(state, action) : developmentReducer(state, action);
