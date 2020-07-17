import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, concatMap } from 'rxjs/operators';

import {
  INIT,
  STORE,
  STORE_FILTER,
  ERROR,
  CLEAR,
  UPDATE,
} from '@modules/filing/state/view/actions';
import { INIT as INIT_FILTERS } from '@modules/filing/state/view-filters/actions';

import { RestfulService } from '@modules/filing/services/restful/restful.service';
import { of, concat } from 'rxjs';
import { RecursiveAstVisitor } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class Effects {
  constructor(
    private actions: Actions,
    private restfulService: RestfulService
  ) {}
  @Effect({ dispatch: true })
  initAction = this.actions.pipe(
    ofType(INIT),
    switchMap((action: any) => {
      return this.restfulService
        .getFiling(action.result.id, action.result.params)
        .pipe(
          map((results: any) => {
            if (action.result.params.filter) {
              return {
                type: STORE_FILTER,
                result: { results, filter: action.result.params.filter },
              };
            }

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
  updateAction = this.actions.pipe(
    ofType(UPDATE),
    concatMap((action) => {
      return concat(
        of({ type: CLEAR }),
        of({ type: INIT_FILTERS, result: action['result']['params'] }),
        of({ type: INIT, result: action['result'] })
      );
    })
  );

  @Effect({ dispatch: true })
  storeFilterAction = this.actions.pipe(
    ofType(STORE_FILTER),
    concatMap((action: any) => {
      const regex = new RegExp(
        `(${action['result']['filter'].split(' ').join('|')})`,
        'gi'
      );
      const recusive = (child) => {
        if (child.hasOwnProperty('type') && child.type === 'text') {
          child.content = child.content.replace(
            regex,
            `<span class="mat-warn-bg">$&</span>`
          );
        }
        if (child.hasOwnProperty('children')) {
          child.children.forEach((nested) => {
            recusive(nested);
          });
        }
      };
      action['result']['results']['data'].forEach((child) => {
        recusive(child['content']);
      });
      return concat(of({ type: STORE, result: action['result']['results'] }));
    })
  );
}
