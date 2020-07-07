import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerComponent } from './components/container/container.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { ViewComponent } from './components/view/view.component';
import { InlineComponent } from './components/inline/inline.component';

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
        // children: [
        //   {
        //     path: ':cik',
        //     component: DatatableComponent,
        //     data: {
        //       // TODO
        //       title: 'Filings Datatable CIK Specific',
        //     },
        //     children: [
        //       {
        //         path: ':form_type',
        //         component: DatatableComponent,
        //         data: {
        //           // TODO
        //           title: 'Filings Datatable CIK and Form Type Specific',
        //         },
        //       },
        //     ],
        //   },
        // ],
      },
      {
        path: 'view/:id',
        component: ViewComponent,
        data: {
          // TODO
          title: 'Specific Filing',
        },
      },
      {
        path: 'inline/:id',
        component: InlineComponent,
        data: {
          // TODO
          title: 'Specific Filing',
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
