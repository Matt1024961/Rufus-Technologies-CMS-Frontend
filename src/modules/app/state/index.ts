import { compose } from '@ngrx/store';

import { ActionReducer, ActionReducerMap, combineReducers } from '@ngrx/store';

// associated reducers
import { reducer as reducer1 } from './responsive';
import { reducer as reducer2 } from './menu';

const reducersMap: ActionReducerMap<any> = {
  responsive: reducer1,
  menu: reducer2,
};

const reducer: ActionReducer<any> = compose(combineReducers)(reducersMap);

export function ModuleReducers(state: any, action: any) {
  return reducer(state, action);
}
