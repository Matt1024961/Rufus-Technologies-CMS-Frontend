import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModuleInterface } from '@modules/faq/state/interface';
import { UPDATE } from '@modules/faq/state/faqs/actions';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fx-host',
  }
})
export class ContainerComponent implements OnInit {

  constructor(private store: Store<ModuleInterface>) { }

  ngOnInit() {
  }

  pageUpdate(event: any) {
    this.store.dispatch({
      type: UPDATE,
      result: event
    });
  }
}
