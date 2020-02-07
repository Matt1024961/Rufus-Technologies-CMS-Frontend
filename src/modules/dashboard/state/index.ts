import { compose } from '@ngrx/store';

import { ActionReducer, ActionReducerMap, combineReducers } from '@ngrx/store';

// associated reducers
import { reducer as reducer1 } from './bar-graph';
import { reducer as reducer2 } from './pie-graph';
import { reducer as reducer3 } from './line-graph';

const reducersMap: ActionReducerMap<any> = {
  'bar-graph': reducer1,
  'pie-graph': reducer2,
  'line-graph': reducer3,
};

const reducer: ActionReducer<any> = compose(combineReducers)(reducersMap);

export function ModuleReducers(state: any, action: any) {
  return reducer(state, action);
}
