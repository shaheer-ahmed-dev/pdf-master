import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AppRoutes } from '../utils/resources/routes';
import { ConvertComponent } from './convert/convert.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: AppRoutes.convert,
        pathMatch: 'full'
      },
      {
        path: AppRoutes.convert,
        component: ConvertComponent,

      },
      {
        path: AppRoutes.adminPanel,
        component: AdminPageComponent
      },
      {
        path: AppRoutes.account,
        component:AccountComponent
      },

    ]

  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
