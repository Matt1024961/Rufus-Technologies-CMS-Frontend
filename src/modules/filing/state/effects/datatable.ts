import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  map,
  concatMap,
  withLatestFrom,
  switchMap,
  catchError,
} from 'rxjs/operators';

import {
  INIT,
  ADDITIONAL_VIEW,
  UPDATE,
  CLEAR,
  ERROR,
  STORE,
} from '@modules/filing/state/datatable/actions';

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
      return this.restfulService.getDatatable(action.result).pipe(
        map((results: any) => {
          results.data.forEach((current) => {
            current.external.html_files = JSON.parse(
              current.external.html_files
            );
            current.external.xml_files = JSON.parse(current.external.xml_files);
            if (!current.hasOwnProperty('additional_view')) {
              current.additional_view = false;
            }
          });
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

  @Effect({ dispatch: true })
  additionalViewAction = this.actions.pipe(
    ofType(ADDITIONAL_VIEW),
    concatMap((action: any) =>
      of(action).pipe(
        withLatestFrom(
          this.store.select((state) => state['filing']['datatable'])
        ),
        map(([storeAction, store]) => {
          store.data.forEach((current) => {
            if (current.id === storeAction.result.id) {
              current.additional_view = !current.additional_view;
            } else {
              current.additional_view = false;
            }
          });

          return {
            type: STORE,
            result: store,
          };
        })
      )
    )
  );

  @Effect({ dispatch: true })
  updateAction = this.actions.pipe(
    ofType(UPDATE),
    concatMap((action) => {
      return concat(
        of({ type: CLEAR }),
        of({ type: INIT_FILTERS, result: action['result'] }),
        of({ type: INIT, result: action['result'] })
      );
    })
  );
}
