import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BarGraphComponent } from './bar-graph.component';
import { UiModule } from '@modules/ui/ui.module';

describe('BarGraphComponent', () => {
  let component: BarGraphComponent;
  let fixture: ComponentFixture<BarGraphComponent>;
  const initialState = {
    dashboard: {
      'bar-graph': null
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BarGraphComponent],
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
    fixture = TestBed.createComponent(BarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
