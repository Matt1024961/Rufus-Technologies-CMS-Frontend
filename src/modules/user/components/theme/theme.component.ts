import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModuleInterface } from '@modules/user/state/interface';
import { Observable } from 'rxjs';

import { UPDATE } from '@modules/user/state/user-config/actions';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeComponent implements OnInit {

  public themeObservable: Observable<ModuleInterface>;

  themes = [
    {
      primary: '#673AB7',
      accent: '#FFC107',
      displayName: 'Deep Purple & Amber',
      name: 'deeppurple-amber',
      isDark: false,
      href: 'assets/themes/deeppurple-amber.css',
    },
    {
      primary: '#3F51B5',
      accent: '#E91E63',
      displayName: 'Indigo & Pink',
      name: 'indigo-pink',
      isDark: false,
      isDefault: true,
      href: 'assets/themes/indigo-pink.css',
    },
    {
      primary: '#E91E63',
      accent: '#607D8B',
      displayName: 'Pink & Blue-grey',
      name: 'pink-bluegrey',
      isDark: true,
      href: 'assets/themes/pink-bluegrey.css',
    },
    {
      primary: '#9C27B0',
      accent: '#4CAF50',
      displayName: 'Purple & Green',
      name: 'purple-green',
      isDark: true,
      href: 'assets/themes/purple-green.css',
    },
  ];

  constructor(private store: Store<ModuleInterface>) {
    this.themeObservable = store.select(states => {
      return states['user']['user-config'];
    });
  }

  ngOnInit() {

  }

  updateTheme(event: { isTrusted: any }, theme: object) {


    if (event.isTrusted && theme && theme.hasOwnProperty('name') && theme.hasOwnProperty('href')) {
      const newTheme = {
        'theme-name': theme['name'],
        'theme-href': theme['href'],
      };
      this.store.dispatch({
        type: UPDATE,
        results: newTheme
      });
    }
  }

  updateFont(event, element) {

    if (Number.isInteger(event.value)) {
      const newFontSize = {
        font: event.value
      };

      this.store.dispatch({
        type: UPDATE,
        results: newFontSize
      });
    }
  }
}
