import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { INIT } from '@modules/user/state/theme/actions';

import { ModuleInterface } from '@modules/user/state/interface';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public themeObservable: Observable<ModuleInterface>;

  constructor(private store: Store<ModuleInterface>) {
    this.themeObservable = store.select((states) => {
      if (states && states[`user`]) {
        return states[`user`][`theme`];
      }
    });
  }

  getConfiguration() {
    this.store.dispatch({
      type: INIT,
    });
  }

  getThemeColors() {
    let themeName;
    this.themeObservable.pipe(first()).subscribe((data) => {
      themeName = data[`name`];
    });
    this.themeObservable.subscribe((data) => {
      themeName = data[`name`];
    });
    console.log(themeName);
    switch (themeName) {
      case `deeppurple-amber`: {
        return {
          backgroundColors: [
            `rgba(103, 58, 183,1)`,
            `rgba(255, 215, 64, 1)`,
            `rgba(244, 67, 54, 1)`,
            `rgba(146, 201, 177,1)`,
            `rgba(237, 210, 224,1)`,
            `rgba(50, 83, 61,1)`,
          ],
          borderColors: [
            `rgba(103, 58, 183, 0.2)`,
            `rgba(255, 215, 64, 0.2)`,
            `rgba(244, 67, 54, 0.2)`,
            `rgba(146, 201, 177,0.2)`,
            `rgba(237, 210, 224,0.2)`,
            `rgba(50, 83, 61,0.2)`,
          ],
          fontColor: `rgba(0,0,0,.87)`,
        };
      }

      case `indigo-pink`: {
        return {
          backgroundColors: [
            `rgba(63, 81, 181, 1)`,
            `rgba(255, 64, 129, 1)`,

            `rgba(114, 221, 247)`,
            `rgba(220, 204, 163)`,
            `rgba(159, 164, 196)`,
            `rgba(244, 67, 54 1)`,
          ],
          borderColors: [
            `rgba(63, 81, 181, 0.2)`,
            `rgba(255, 64, 129, 0.2)`,

            `rgba(114, 221, 247)`,
            `rgba(220, 204, 163)`,
            `rgba(159, 164, 196)`,
            `rgba(244, 67, 54, 0.2)`,
          ],
          fontColor: `rgba(0,0,0,.87)`,
        };
      }

      case `pink-bluegrey`: {
        return {
          backgroundColors: [
            `rgba(194, 24, 91, 1)`,
            `rgba(176, 190, 197, 1)`,
            `rgba(244, 67, 54, 1)`,
            `rgba(142, 166, 4, 1)`,
            `rgba(59, 82, 73, 1)`,
            `rgba(73, 59, 42, 1)`,
          ],
          borderColors: [
            `rgba(194, 24, 91, 0.2)`,
            `rgba(176, 190, 197, 0.2)`,
            `rgba(244, 67, 54, 0.2)`,
            `rgba( 142, 166, 4, 0.2)`,
            `rgba( 59, 82, 73, 0.2)`,
            `rgba( 73, 59, 42, 0.2)`,
          ],
          fontColor: `#fff`,
        };
      }

      case `purple-green`: {
        return {
          backgroundColors: [
            `rgba(123, 31, 162, 1)`,
            `rgba(105, 240, 174, 1)`,
            `rgba(244, 67, 54, 1)`,
            `rgba(178, 152, 220, 1)`,
            `rgba(184, 208, 235, 1)`,
            `rgba(242, 175, 41, 1)`,
          ],
          borderColors: [
            `rgba(123, 31, 162, 0.2)`,
            `rgba(105, 240, 174, 0.2)`,
            `rgba(244, 67, 54, 0.2)`,
            `rgba( 178, 152, 220, 0.2)`,
            `rgba( 184, 208, 235, 0.2)`,
            `rgba(242, 175, 41, 0.2)`,
          ],
          fontColor: `#fff`,
        };
      }

      default: {
        console.log(`hmmmm`);
      }
    }
    return themeName;
  }
}
