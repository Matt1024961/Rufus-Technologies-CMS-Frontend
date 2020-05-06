import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRoutingModule } from './filing-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UiModule } from '@modules/ui/ui.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ModuleReducers } from '@modules/filing/state/';
import { ModuleEffects } from '@modules/filing/state/effects';

import { RestfulService } from '@modules/filing/services/restful/restful.service';
import { ContainerComponent } from './components/container/container.component';
import { DatatableComponent } from './components/datatable/datatable.component';

@NgModule({
  declarations: [ContainerComponent, DatatableComponent],
  imports: [
    CommonModule,
    FormRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    StoreModule.forFeature('filing', ModuleReducers),
    EffectsModule.forFeature(ModuleEffects),

    UiModule,
  ],
  providers: [RestfulService],
})
export class FilingModule {}
