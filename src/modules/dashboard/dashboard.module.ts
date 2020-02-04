import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { UiModule } from '@modules/ui/ui.module';

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
    UiModule,
  ]
})
export class DashboardModule { }
