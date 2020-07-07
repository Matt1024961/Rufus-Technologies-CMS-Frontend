import { Injectable } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ModuleInterface } from '@modules/app/state/interface';
import { STORE } from '@modules/app/state/responsive/actions';
import { filter, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  responsive: Subscription;

  constructor(
    public mediaObserver: MediaObserver,
    private store: Store<ModuleInterface>
  ) {}

  getResponsive() {
    this.responsive = this.mediaObserver
      .asObservable()
      .pipe(
        filter((changes: MediaChange[]) => changes.length > 0),
        map((changes: MediaChange[]) => changes[0])
      )
      .subscribe((change: MediaChange) => {
        const responsiveUpdate = {
          media_query: change.mediaQuery,
          alias: change.mqAlias,
          suffix: change.suffix,
        };
        this.store.dispatch({
          type: STORE,
          result: responsiveUpdate,
        });
      });
  }
}
