import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PieGraphComponent } from './pie-graph.component';
import { UiModule } from '@modules/ui/ui.module';

describe('PieGraphComponent', () => {
  let component: PieGraphComponent;
  let fixture: ComponentFixture<PieGraphComponent>;
  const initialState = {
    dashboard: {
      'pie-graph': null
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PieGraphComponent],
      imports: [
        BrowserAnimationsModule,
        UiModule,
      ],
      providers: [
        provideMockStore({ initialState })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
