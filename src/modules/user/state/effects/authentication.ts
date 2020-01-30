import { Injectable, ɵConsole } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, withLatestFrom, switchMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { ModuleInterface } from '../interface';

import { INIT, LOGIN, LOGOUT, LOCALSTORAGE, STORE } from '@modules/user/state/authentication/actions';
import { INIT as INIT_FAVORITE } from '@modules/user/state/favorites/actions';


import { EMPTY, of } from 'rxjs';

import { RestfulService } from '@modules/user/services/restful/restful.service';



@Injectable()
export class Effects {
  constructor(
    private actions: Actions,
    private store: Store<ModuleInterface>,
    private restfulService: RestfulService
  ) { }

  @Effect({ dispatch: true })
  initAction = this.actions.pipe(
    ofType(INIT),
    switchMap((action: any) => {
      const authentication = JSON.parse(localStorage.getItem('authentication'));
      return [
        {
          type: STORE,
          result: authentication
        }];
    }
    )
  );

  @Effect({ dispatch: true })
  loginAction = this.actions.pipe(
    ofType(LOGIN),
    mergeMap((action: any) =>
      this.restfulService.getLogin(action['result']).pipe(
        map((results: any) => {
          if (results && Object.keys(results).length > 0) {
            return {
              type: LOCALSTORAGE,
              result: results
            };
          } else {
            return {
              type: STORE,
              result: {}
            };
          }
        }),
        catchError((err) => {
          console.log(err);
          return EMPTY;
        })
      )
    )
  );

  @Effect({ dispatch: true })
  logoutAction = this.actions.pipe(
    ofType(LOGOUT),
    switchMap((action: any) => {
      localStorage.removeItem('authentication');
      return [{
        type: STORE,
        result: {}
      }];
    }
    )
  );

  @Effect({ dispatch: true })
  localStorageAction = this.actions.pipe(
    ofType(LOCALSTORAGE),
    switchMap((action: any) => {
      if (action.result && Object.keys(action.result).length > 0) {

        localStorage.setItem('authentication', JSON.stringify(action.result));

      } else {
        console.warn('User is not authenticated!');
      }
      return [{
        type: STORE,
        result: action.result
      }];
    }
    )
  );

  @Effect({ dispatch: true })
  storeAction = this.actions.pipe(
    ofType(STORE),
    switchMap((action: any) => {
      if (action && action.result) {
        return [{
          type: INIT_FAVORITE,
          result: action.result
        }];
      }
      return [];
    })
  );
}
