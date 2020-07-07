import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  map,
  concatMap,
  withLatestFrom,
  switchMap,
  catchError,
} from 'rxjs/operators';

import { INIT, CLEAR, ERROR, STORE } from '@modules/filing/state/files/actions';

import {
  INIT as INIT_FILTERS,
  CLEAR as CLEAR_FILTERS,
} from '@modules/filing/state/datatable-filters/actions';

import { RestfulService } from '@modules/filing/services/restful/restful.service';
import { concat, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { ModuleInterface } from '@modules/filing/state/interface';

@Injectable()
export class Effects {
  constructor(
    private actions: Actions,
    private restfulService: RestfulService,
    private store: Store<ModuleInterface>
  ) {}

  @Effect({ dispatch: true })
  initAction = this.actions.pipe(
    ofType(INIT),
    switchMap((action: any) => {
      return this.restfulService.getFiles(action.result.id).pipe(
        map((results: any) => {
          results.html_files = JSON.parse(results.html_files);
          results.xml_files = JSON.parse(results.xml_files);
          return {
            type: STORE,
            result: results,
          };
        })
      );
    }),
    catchError((error) => {
      return of({ type: ERROR, result: { type: 'ERROR', message: error } });
    })
  );
}
