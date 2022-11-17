import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPartnerComponent } from './add-partner/add-partner.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail', component: DetailComponent},
  {path: 'add', component: AddPartnerComponent},
  {path: 'edit-detail/:id', component: DetailComponent},
  {path: 'delete-detail/:id', component: DetailComponent},
  {path: '',redirectTo: '/dashboard',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
