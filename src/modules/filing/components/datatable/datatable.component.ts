import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ModuleInterface } from '@modules/filing/state/interface';
import {
  ADDITIONAL_VIEW,
  UPDATE,
} from '@modules/filing/state/datatable/actions';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fx-host',
  },
  providers: [
    { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: 'check-indeterminate' },
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DatatableComponent implements OnInit {
  public pageSizeOptions: number[] = [25, 50, 100];

  public displayedColumns: string[] = [
    'view',
    'cik',
    'publish_date',
    'form_type',
    'name',
    'filing_period',
    'file_number',
    'acceptance_date',
  ];

  public userOptions = {
    pageIndex: 0,
    pageSize: 25,
    filter: null,
    filing_inline: null,
    parsing_accomplished: null,
    order: 'name',
    orderDirection: 'asc',
  };

  public dataObservable: Observable<ModuleInterface>;

  public filterObserver: { next: (arg0: any) => void };

  public searchForm: FormGroup;

  constructor(
    private store: Store<ModuleInterface>,
    private formBuilder: FormBuilder
  ) {
    this.dataObservable = store.select((states) => {
      return states['filing']['datatable'];
    });

    this.searchForm = formBuilder.group({
      filter: [
        this.userOptions.filter,
        [Validators.required, Validators.minLength(3)],
      ],

      filing_inline: [this.userOptions.filing_inline, [Validators.required]],

      parsing_accomplished: [
        this.userOptions.parsing_accomplished,
        [Validators.required],
      ],
    });
    this.onSearchChange();
  }

  ngOnInit(): void {
    this.store.dispatch({
      type: UPDATE,
      result: this.userOptions,
    });
  }

  reloadContent() {
    this.userOptions = {
      pageIndex: 0,
      pageSize: 25,
      filter: null,
      filing_inline: null,
      parsing_accomplished: null,
      order: 'name',
      orderDirection: 'asc',
    };
    this.store.dispatch({
      type: UPDATE,
      result: this.userOptions,
    });
  }

  onPaginateChange($event) {
    $event.pageIndex++;
    if (
      this.userOptions.pageIndex !== $event.pageIndex ||
      this.userOptions.pageSize !== $event.pageSize
    ) {
      console.log($event.pageSize);
      this.userOptions.pageSize = $event.pageSize;

      delete $event.previousPageIndex;
      delete $event.length;

      this.store.dispatch({
        type: UPDATE,
        result: this.userOptions,
      });
    }
  }

  onSortChange($event) {
    if ($event.direction) {
      this.userOptions.order = $event.active;
      this.userOptions.orderDirection = $event.direction;
    } else {
      this.userOptions.order = 'name';
      this.userOptions.orderDirection = 'asc';
    }
    this.store.dispatch({
      type: UPDATE,
      result: {
        order:
          this.userOptions.orderDirection === 'desc'
            ? `-${this.userOptions.order}`
            : this.userOptions.order,
      },
    });
  }

  onAdditionalView(input): void {
    this.store.dispatch({
      type: ADDITIONAL_VIEW,
      result: input,
    });
  }

  onSearchChange(): void {
    this.searchForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((formValue) => {
        this.userOptions.pageIndex = 0;
        this.userOptions.parsing_accomplished = formValue.parsing_accomplished;
        if (formValue.filter !== null) {
          this.userOptions.filter = formValue.filter;
        }

        // console.log(formValue);
        console.log(this.userOptions);
        this.store.dispatch({
          type: UPDATE,
          result: this.userOptions,
        });
      });
  }

  toggleParsingAccomplished() {
    switch (this.userOptions.parsing_accomplished) {
      case true: {
        this.userOptions.parsing_accomplished = false;
        break;
      }
      case false: {
        this.userOptions.parsing_accomplished = null;
        break;
      }
      default: {
        this.userOptions.parsing_accomplished = true;
        break;
      }
    }
    this.searchForm.patchValue({
      parsing_accomplished: this.userOptions.parsing_accomplished,
    });
  }

  toggleFilingInline() {
    switch (this.userOptions.filing_inline) {
      case true: {
        this.userOptions.filing_inline = false;
        break;
      }
      case false: {
        this.userOptions.filing_inline = null;
        break;
      }
      default: {
        this.userOptions.filing_inline = true;
        break;
      }
    }
    this.searchForm.patchValue({
      filing_inline: this.userOptions.filing_inline,
    });
  }
}
