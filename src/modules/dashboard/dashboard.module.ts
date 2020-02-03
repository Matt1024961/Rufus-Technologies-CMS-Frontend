import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { UiModule } from '@modules/ui/ui.module';

import { ContainerComponent } from './components/container/container.component';
import { ExampleComponent } from './components/example/example.component';


@NgModule({
  declarations: [ContainerComponent, ExampleComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    UiModule,
  ]
})
export class DashboardModule { }
