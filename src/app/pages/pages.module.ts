import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';
import { AccountComponent } from './account/account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConvertComponent } from './convert/convert.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminPageComponent } from './admin-page/admin-page.component';



@NgModule({
  declarations: [
    PagesComponent,
    AccountComponent,
    NotFoundComponent,
    ConvertComponent,
    AdminPageComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
  ]
})
export class PagesModule { }
