import { Injectable, ɵConsole } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, withLatestFrom, switchMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { ModuleInterface } from '../interface';

import { INIT, LOCALSTORAGE, STORE } from '@modules/user/state/favorites/actions';

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
    mergeMap((action: any) =>
      this.restfulService.getFavorites(action['result']).pipe(
        map((results: any) => {
          return {
            type: STORE,
            result: results
          };
        }
        )
      )
    )
  );
}
