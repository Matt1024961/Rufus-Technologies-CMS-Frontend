import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { provideMockStore } from '@ngrx/store/testing';

import { BreadcrumbComponent } from './breadcrumb.component';
import { UiModule } from '@modules/ui/ui.module';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  const initialState = {
    'router': {
      'state': {
        'title': 'UNKNOWN',
        'url': '/',
        'params': {},
        'queryParams': {},
      },
      'navigationId': 1
    }
  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [BreadcrumbComponent],
      imports: [
        RouterTestingModule,
        UiModule,
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
