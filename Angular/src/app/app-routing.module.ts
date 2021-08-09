import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'login',
  loadChildren: () => import('./Authentication/auth.module').then(m => m.AuthModule)},

  {path:'dashboard',
  loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
   {path:'**',redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
