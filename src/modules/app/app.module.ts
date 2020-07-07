import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from '@modules/app/app-routing.module';
import { UiModule } from '@modules/ui/ui.module';
import { UserModule } from '@modules/user/user.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@env/environment';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { ModuleReducers } from '@modules/app/state/';
import { CustomRouter } from '@modules/app/state/router/custom-router';

import { ResponsiveService } from '@modules/app/services/responsive/responsive.service';
import { ResponsiveFactory } from '@modules/app/factories/responsive.factory';

import { RootComponent } from '@modules/app/components/root/root.component';
import { BreadcrumbComponent } from '@modules/app/components/breadcrumb/breadcrumb.component';
import { MainMenuComponent } from '@modules/app/components/main-menu/main-menu.component';

import {
  MatFormFieldDefaultOptions,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline',
};

@NgModule({
  declarations: [RootComponent, BreadcrumbComponent, MainMenuComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),

    StoreModule.forRoot(
      {
        router: routerReducer,
      },
      {
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictActionWithinNgZone: true,
        },
      }
    ),
    StoreModule.forFeature('app', ModuleReducers),

    StoreRouterConnectingModule.forRoot({
      serializer: CustomRouter,
      stateKey: 'router',
    }),

    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      name: 'Boiler Plate Store',
    }),

    EffectsModule.forRoot([]),

    UiModule,
    UserModule,
  ],
  providers: [
    ResponsiveService,
    {
      provide: APP_INITIALIZER,
      useFactory: ResponsiveFactory,
      deps: [ResponsiveService],
      multi: true,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance,
    },
  ],
  bootstrap: [RootComponent],
})
export class AppModule {}
