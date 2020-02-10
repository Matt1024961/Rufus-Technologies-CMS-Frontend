import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';

import { FaqsComponent } from './faqs.component';
import { UiModule } from '@modules/ui/ui.module';

describe('FaqsComponent', () => {
  let component: FaqsComponent;
  let fixture: ComponentFixture<FaqsComponent>;
  const initialState = {
    faq: {
      faqs: null
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FaqsComponent],
      imports: [
        BrowserAnimationsModule,
        UiModule,
      ],

      providers: [
        provideMockStore({ initialState })
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
