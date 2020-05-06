import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerComponent } from './components/container/container.component';
import { DatatableComponent } from './components/datatable/datatable.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '',
        component: DatatableComponent,
        data: {
          // TODO
          title: 'Filings Datatable',
        },
      },
    ],
    data: {
      // TODO
      title: 'Filings',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule {}
