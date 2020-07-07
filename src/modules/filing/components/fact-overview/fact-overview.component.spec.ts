import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactOverviewComponent } from './fact-overview.component';

describe('FactOverviewComponent', () => {
  let component: FactOverviewComponent;
  let fixture: ComponentFixture<FactOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
