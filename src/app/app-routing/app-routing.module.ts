import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BasicTableComponent } from '../basic-table/basic-table.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CallbackComponent } from '../callback/callback.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'table', component: BasicTableComponent },
  { path: 'callback', component: CallbackComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
