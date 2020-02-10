import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModuleInterface } from '@modules/app/state/interface';
import { STORE_MAIN } from '@modules/app/state/menu/actions';
import { environment } from '@env/environment';


@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainMenuComponent implements OnInit {

  public version: string = environment.version;
  constructor(private store: Store<ModuleInterface>) {
  }

  ngOnInit() {
  }

  closeMenu() {
    this.store.dispatch({
      type: STORE_MAIN,
    });
  }
}
