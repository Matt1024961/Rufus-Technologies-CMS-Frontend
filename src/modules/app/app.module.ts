import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from '@modules/app/app-routing.module';
import { UiModule } from '@modules/ui/ui.module';
import { UserModule } from '@modules/user/user.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@env/environment';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { CustomRouter } from '@modules/app/state/router/custom-router';

import { RootComponent } from '@modules/app/components/root/root.component';
import { BreadcrumbComponent } from '@modules/app/components/breadcrumb/breadcrumb.component';
import { MainMenuComponent } from '@modules/app/components/main-menu/main-menu.component';

@NgModule({
  declarations: [
    RootComponent,
    BreadcrumbComponent,
    MainMenuComponent,
  ],
  imports: [
    BrowserModule,

    AppRoutingModule,

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    StoreModule.forRoot({
      router: routerReducer
    }, {
      runtimeChecks: {
      }
    }),

    StoreRouterConnectingModule.forRoot({
      serializer: CustomRouter,
      stateKey: 'router'
    }),

    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      name: 'Boiler Plate (Update Name)'
    }),

    EffectsModule.forRoot([]),

    UiModule,
    UserModule
  ],
  bootstrap: [RootComponent],

})
export class AppModule { }
