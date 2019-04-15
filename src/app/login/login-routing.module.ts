import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RaLoginComponent } from './login.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: RaLoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaLoginRoutingModule { }
