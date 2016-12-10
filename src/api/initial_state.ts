import { fromJS } from 'immutable';

export const initial_state = Object.entries((<any>window).initial_state)
                                   .reduce((state: Object, [key, val]) =>
                                     ({...state, [key]: fromJS(val)}), {});
