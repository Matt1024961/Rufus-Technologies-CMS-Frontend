import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  loadChildren: () =>
    import('src/modules/dashboard/dashboard.module').then(
      m => m.DashboardModule
    ),
  canActivate: [
    // TODO
  ],
  data: {
    title: 'Dashboard'
  }
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
