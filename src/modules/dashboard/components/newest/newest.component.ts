import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import * as Chart from 'chart.js';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ModuleInterface } from '@modules/user/state/interface';
import { UPDATE } from '@modules/dashboard/state/newest/actions';

@Component({
  selector: 'app-newest',
  templateUrl: './newest.component.html',
  styleUrls: ['./newest.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewestComponent implements OnInit {
  public displayedColumns: string[] = [
    'view',
    'cik',
    'publish_date',
    'form_type',
    'name',
    'filing_period',
  ];
  public dataObservable: Observable<ModuleInterface>;

  constructor(private store: Store<ModuleInterface>) {
    this.dataObservable = store.select((states) => {
      return states['dashboard']['newest'];
    });
  }

  ngOnInit(): void {}

  reloadContent() {
    this.store.dispatch({
      type: UPDATE,
    });
  }
}
