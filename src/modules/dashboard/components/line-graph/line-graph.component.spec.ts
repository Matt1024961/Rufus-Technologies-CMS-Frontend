import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LineGraphComponent } from './line-graph.component';
import { UiModule } from '@modules/ui/ui.module';

describe('LineGraphComponent', () => {
  let component: LineGraphComponent;
  let fixture: ComponentFixture<LineGraphComponent>;
  const initialState = {
    dashboard: {
      'line-graph': null
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LineGraphComponent],
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
    fixture = TestBed.createComponent(LineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
