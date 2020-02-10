import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModuleInterface } from '@modules/faq/state/interface';
import { Observable } from 'rxjs';
import { INIT } from '@modules/faq/state/faqs/actions';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqsComponent implements OnInit {
  public faqsObservable: Observable<ModuleInterface>;

  constructor(private store: Store<ModuleInterface>) {
    this.faqsObservable = store.select(states => {
      return states['faq']['faqs'];
    });
  }

  ngOnInit() {
    this.store.dispatch({
      type: INIT
    });
  }

}
