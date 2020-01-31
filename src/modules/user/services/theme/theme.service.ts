import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { INIT } from '@modules/user/state/theme/actions';

import { ModuleInterface } from '@modules/user/state/interface';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public themeObservable: Observable<ModuleInterface>;

  constructor(
    private store: Store<ModuleInterface>,
  ) {

    this.themeObservable = store.select(states => {
      if (states && states['user']) {
        return states['user']['theme'];
      }
    });
  }

  getConfiguration() {
    this.store.dispatch({
      type: INIT,
    });
  }
}
