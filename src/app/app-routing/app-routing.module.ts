import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BasicTableComponent } from '../basic-table/basic-table.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CallbackComponent } from '../callback/callback.component';
import { RoleGuard } from '../auth/role.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [RoleGuard], data: { expectedRoles: [] } },
  { path: 'table', component: BasicTableComponent, canActivate: [RoleGuard], data: { expectedRoles: ['Admin'] } },
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
