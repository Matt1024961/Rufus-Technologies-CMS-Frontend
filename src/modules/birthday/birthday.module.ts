import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountdownModule } from 'ngx-countdown';

import { UiModule } from '@modules/ui/ui.module';

import { BirthdayRoutingModule } from './birthday-routing.module';
import { ContainerComponent } from './components/container/container.component';
import { YoutubeComponent } from './components/youtube/youtube.component';
import { MapComponent } from './components/map/map.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { MessageComponent } from './components/message/message.component';


@NgModule({
  declarations: [ContainerComponent, YoutubeComponent, MapComponent, CountdownComponent, MessageComponent],
  imports: [
    CommonModule,
    BirthdayRoutingModule,
    CountdownModule,
    UiModule,
  ]
})
export class BirthdayModule { }
