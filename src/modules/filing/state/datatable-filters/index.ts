import { INIT, UPDATE, CLEAR, ERROR, STORE } from './actions';

import { ReducerInterface } from './interface';

export function reducer(
  state: ReducerInterface = {
    page_index: 1,
    page_size: 25,
    filter: null,
    filing_inline: null,
    parsing_accomplished: null,
    order: 'name',
    order_direction: 'asc',
    cik: null,
    form_type: null,
    filing_period: null,
  },
  action: any
) {
  switch (action.type) {
    case INIT: {
      return null;
    }

    case UPDATE: {
      return state;
    }

    case STORE: {
      if (action.result) {
        return Object.assign({}, action.result);
      } else {
        return null;
      }
    }

    case ERROR: {
      return Object.assign({}, action.result);
    }

    case CLEAR: {
      state = null;
      return state;
    }

    default: {
      return state;
    }
  }
}
