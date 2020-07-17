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
import { FactOverviewComponent } from './components/fact-overview/fact-overview.component';
import { DefinitionComponent } from './components/definition/definition.component';
import { FilingComponent } from './components/filing/filing.component';
import { DatatableFiltersComponent } from './components/datatable-filters/datatable-filters.component';
import { ViewComponent } from './components/view/view.component';
import { InlineComponent } from './components/inline/inline.component';
import { FileMenuComponent } from './components/file-menu/file-menu.component';
import { AllFilesListComponent } from './components/all-files-list/all-files-list.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  declarations: [
    ContainerComponent,
    DatatableComponent,
    FactOverviewComponent,
    DefinitionComponent,
    FilingComponent,
    DatatableFiltersComponent,
    ViewComponent,
    InlineComponent,
    FileMenuComponent,
    AllFilesListComponent,
    SafeHtmlPipe,
  ],
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
