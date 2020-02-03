import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotComponent } from './components/forgot/forgot.component';
const routes: Routes = [
  {
    path: 'forgot',
    component: ForgotComponent,
    data: {
      // TODO
      breadcrumb: 'Forgot User Credentials'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
