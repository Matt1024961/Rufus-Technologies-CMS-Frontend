import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { UserRoutingModule } from '@modules/user/user-routing.module';
import { UiModule } from '@modules/ui/ui.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ModuleReducers } from '@modules/user/state/';
import { ModuleEffects } from '@modules/user/state/effects';

import { UserConfigService } from '@modules/user/services/user-config/user-config.service';
import { RestfulService } from '@modules/user/services/restful/restful.service';
import { UserConfigsFactory } from '@modules/user/factories/user-configs.factory';

import { ThemeComponent } from '@modules/user/components/theme/theme.component';
import { UserMenuComponent } from '@modules/user/components/user-menu/user-menu.component';
import { LoginComponent } from '@modules/user/components/login/login.component';

@NgModule({
  declarations: [UserMenuComponent, ThemeComponent, LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    UserRoutingModule,

    StoreModule.forFeature('user', ModuleReducers),
    EffectsModule.forFeature(ModuleEffects),

    UiModule
  ],
  exports: [UserMenuComponent, ThemeComponent],
  providers: [
    RestfulService,
    UserConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: UserConfigsFactory,
      deps: [
        UserConfigService
      ],
      multi: true
    },
  ],
})
export class UserModule { }
