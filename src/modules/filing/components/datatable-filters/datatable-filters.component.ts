import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ModuleInterface } from '@modules/filing/state/interface';
import { UPDATE } from '@modules/filing/state/datatable/actions';
@Component({
  selector: 'app-datatable-filters',
  templateUrl: './datatable-filters.component.html',
  styleUrls: ['./datatable-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatatableFiltersComponent implements OnInit {
  public dataObservable: Observable<ModuleInterface>;

  constructor(private store: Store<ModuleInterface>) {
    this.dataObservable = store.select((states) => {
      return states['filing']['datatable_filter'];
    });
  }

  ngOnInit(): void {}

  getLength(objectInput) {
    let countToReturn = 0;
    for (const prop in objectInput) {
      if (objectInput.hasOwnProperty(prop) && objectInput[prop] !== null) {
        countToReturn++;
      }
    }
    return countToReturn;
  }

  removeFilter(event, current, fullObject) {
    if (event.isTrusted) {
      fullObject[current.key] = null;

      this.store.dispatch({
        type: UPDATE,
        result: fullObject,
      });
    }
  }
  resetFilter(event, current, fullObject) {
    if (event.isTrusted) {
      switch (current.key) {
        case 'page_index': {
          fullObject[current.key] = 1;
          break;
        }
        case 'page_size': {
          fullObject[current.key] = 25;
          break;
        }
        case 'order': {
          fullObject[current.key] = 'name';
          break;
        }
        case 'order_direction': {
          fullObject[current.key] = 'asc';
          break;
        }

        default: {
          console.error(current.key);
        }
      }
      this.store.dispatch({
        type: UPDATE,
        result: fullObject,
      });
    }
  }
}
