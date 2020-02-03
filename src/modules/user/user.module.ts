import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { UserRoutingModule } from '@modules/user/user-routing.module';
import { UiModule } from '@modules/ui/ui.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ModuleReducers } from '@modules/user/state/';
import { ModuleEffects } from '@modules/user/state/effects';

import { ThemeService } from '@modules/user/services/theme/theme.service';
import { RestfulService } from '@modules/user/services/restful/restful.service';
import { ThemeFactory } from '@modules/user/factories/theme.factory';

import { AuthenticationService } from '@modules/user/services/authentication/authentication.service';
import { AuthenticationFactory } from '@modules/user/factories/authentication.factory';

import { ThemeComponent } from '@modules/user/components/theme/theme.component';
import { UserMenuComponent } from '@modules/user/components/user-menu/user-menu.component';
import { LoginComponent } from '@modules/user/components/login/login.component';
import { AuthenticatedUserMenuComponent } from './components/authenticated-user-menu/authenticated-user-menu.component';
import { AuthenticatedUserWelcomeComponent } from './components/authenticated-user-welcome/authenticated-user-welcome.component';
import { AuthenticatedUserFavoritesComponent } from './components/authenticated-user-favorites/authenticated-user-favorites.component';
import { ForgotComponent } from './components/forgot/forgot.component';

@NgModule({
  declarations: [
    UserMenuComponent,
    ThemeComponent,
    LoginComponent,
    AuthenticatedUserMenuComponent,
    AuthenticatedUserWelcomeComponent,
    AuthenticatedUserFavoritesComponent,
    ForgotComponent
  ],
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
    ThemeService,
    {
      provide: APP_INITIALIZER,
      useFactory: ThemeFactory,
      deps: [
        ThemeService
      ],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: AuthenticationFactory,
      deps: [
        AuthenticationService
      ],
      multi: true
    },
  ],
})
export class UserModule { }
