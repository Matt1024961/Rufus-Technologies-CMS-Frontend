import { compose } from '@ngrx/store';

import { ActionReducer, ActionReducerMap, combineReducers } from '@ngrx/store';

// associated reducers
import { reducer as reducer1 } from './theme';
import { reducer as reducer2 } from './authentication';
import { reducer as reducer3 } from './favorites';


const reducersMap: ActionReducerMap<any> = {
  theme: reducer1,
  authentication: reducer2,
  favorites: reducer3,
};

const reducer: ActionReducer<any> = compose(combineReducers)(reducersMap);

export function ModuleReducers(state: any, action: any) {
  return reducer(state, action);
}
