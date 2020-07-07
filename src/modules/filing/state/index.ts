import { compose } from '@ngrx/store';

import { ActionReducer, ActionReducerMap, combineReducers } from '@ngrx/store';

// associated reducers
import { reducer as reducer1 } from './datatable';
import { reducer as reducer2 } from './datatable-filters';
import { reducer as reducer3 } from './view';
import { reducer as reducer4 } from './view-filters';
import { reducer as reducer5 } from './files';

const reducersMap: ActionReducerMap<any> = {
  datatable: reducer1,
  datatable_filter: reducer2,
  view: reducer3,
  view_filter: reducer4,
  files: reducer5,
};

const reducer: ActionReducer<any> = compose(combineReducers)(reducersMap);

export function ModuleReducers(state: any, action: any) {
  return reducer(state, action);
}
