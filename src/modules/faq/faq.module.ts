import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';

import { UiModule } from '@modules/ui/ui.module';

import { ContainerComponent } from './components/container/container.component';


@NgModule({
  declarations: [ContainerComponent],
  imports: [
    CommonModule,
    FaqRoutingModule,

    UiModule,
  ]
})
export class FaqModule { }
