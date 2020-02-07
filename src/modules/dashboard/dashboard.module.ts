import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { UiModule } from '@modules/ui/ui.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ModuleReducers } from '@modules/dashboard/state/';
import { ModuleEffects } from '@modules/dashboard/state/effects';

import { RestfulService } from '@modules/user/services/restful/restful.service';

import { ContainerComponent } from './components/container/container.component';
import { ExampleComponent } from './components/example/example.component';
import { BarGraphComponent } from './components/bar-graph/bar-graph.component';
import { PieGraphComponent } from './components/pie-graph/pie-graph.component';
import { LineGraphComponent } from './components/line-graph/line-graph.component';


@NgModule({
  declarations: [ContainerComponent, ExampleComponent, BarGraphComponent, PieGraphComponent, LineGraphComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    StoreModule.forFeature('dashboard', ModuleReducers),
    EffectsModule.forFeature(ModuleEffects),

    UiModule,
  ],
  providers: [RestfulService],
})
export class DashboardModule { }
