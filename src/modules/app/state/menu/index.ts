import { STORE_MAIN, STORE_USER } from './actions';

import { ReducerInterface } from './interface';

export function reducer(state: ReducerInterface = { mainMenu: false, userMenu: false }, action: any) {
  switch (action.type) {

    case STORE_MAIN: {
      state.mainMenu = !state.mainMenu;
      return state;
    }

    case STORE_USER: {
      state.userMenu = !state.userMenu;
      return state;
    }
    default: {
      return state;
    }
  }
}
