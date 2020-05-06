import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { UiModule } from '@modules/ui/ui.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ModuleReducers } from '@modules/dashboard/state/';
import { ModuleEffects } from '@modules/dashboard/state/effects';

import { RestfulService } from '@modules/dashboard/services/restful/restful.service';

import { ContainerComponent } from './components/container/container.component';
import { ExampleComponent } from './components/example/example.component';
import { OverviewComponent } from './components/overview/overview.component';
import { CountsComponent } from './components/counts/counts.component';
import { NewestComponent } from './components/newest/newest.component';

@NgModule({
  declarations: [
    ContainerComponent,
    ExampleComponent,
    OverviewComponent,
    CountsComponent,
    NewestComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DashboardRoutingModule,
    StoreModule.forFeature('dashboard', ModuleReducers),
    EffectsModule.forFeature(ModuleEffects),

    UiModule,
  ],
  providers: [RestfulService],
})
export class DashboardModule {}
