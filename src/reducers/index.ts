import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { fromJS, Map } from 'immutable';
import { stateSetter, setRootState } from './hmr';
import { counterActions, counter } from './counter';

declare var initial_state: Object;

export const initialState: AppState = readInitialState();


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

function readInitialState() {
  return Object.entries(initial_state)
    .reduce((state: AppState, [key, val]) => ({...state, [key]: fromJS(val)}),
            (<AppState>{}));
}
