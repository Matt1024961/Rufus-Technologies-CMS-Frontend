import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModuleInterface } from '@modules/app/state/interface';
import { STORE_MAIN, STORE_USER } from '@modules/app/state/menu/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  public menuObservable: Observable<ModuleInterface>;

  constructor(private store: Store<ModuleInterface>) {
    this.menuObservable = store.select((states) => {
      return states['app']['menu'];
    });
  }

  ngOnInit(): void {}

  toggleMainMenu() {
    this.store.dispatch({
      type: STORE_MAIN,
    });
  }

  toggleUserMenu() {
    this.store.dispatch({
      type: STORE_USER,
    });
  }
}
