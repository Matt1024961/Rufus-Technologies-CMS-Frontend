import { compose } from '@ngrx/store';

import { ActionReducer, ActionReducerMap, combineReducers } from '@ngrx/store';

// associated reducers
import { reducer as reducer1 } from './overview';
import { reducer as reducer2 } from './newest';
import { reducer as reducer3 } from './counts';

const reducersMap: ActionReducerMap<any> = {
  overview: reducer1,
  newest: reducer2,
  counts: reducer3,
};

const reducer: ActionReducer<any> = compose(combineReducers)(reducersMap);

export function ModuleReducers(state: any, action: any) {
  return reducer(state, action);
}
