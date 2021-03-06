import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModuleInterface } from '@modules/app/state/interface';
import { Observable } from 'rxjs';
import { INIT } from '@modules/dashboard/state/container/actions';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fx-host',
  },
})
export class ContainerComponent implements OnInit {
  public responsiveObservable: Observable<ModuleInterface>;

  constructor(private store: Store<ModuleInterface>) {
    this.responsiveObservable = store.select((states) => {
      return states['app']['responsive'];
    });
  }

  ngOnInit() {
    this.store.dispatch({
      type: INIT,
    });
  }

  getDynamicColumns(input) {
    const gridByBreakpoint = {
      xl: 2,
      lg: 2,
      md: 2,
      sm: 1,
      xs: 1,
    };
    return gridByBreakpoint[input.alias];
  }

  getDynamicRowHeight(input) {
    const gridByBreakpoint = {
      xl: '50%',
      lg: '50%',
      md: '50%',
      sm: '50%',
      xs: '40%',
    };
    return gridByBreakpoint[input.alias];
  }
}
