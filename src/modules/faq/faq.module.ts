import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ModuleReducers } from '@modules/faq/state/';
import { ModuleEffects } from '@modules/faq/state/effects';

import { RestfulService } from '@modules/faq/services/restful/restful.service';

import { UiModule } from '@modules/ui/ui.module';

import { ContainerComponent } from './components/container/container.component';
import { FaqsComponent } from './components/faqs/faqs.component';


@NgModule({
  declarations: [ContainerComponent, FaqsComponent],
  imports: [
    CommonModule,
    FaqRoutingModule,
    StoreModule.forFeature('faq', ModuleReducers),
    EffectsModule.forFeature(ModuleEffects),
    UiModule,
  ],
  providers: [RestfulService],
})
export class FaqModule { }
