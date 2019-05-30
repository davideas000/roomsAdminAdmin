import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RaMainComponent } from './main.component';
import { roomsPagesRoutes } from './rooms-pages/rooms-pages-routes';
import { newReservationRoutes } from './new-reservation/new-reservation-routes';

const routes: Routes = [
  {
    path: 'main',
    component: RaMainComponent,
    children: [
      roomsPagesRoutes,
      newReservationRoutes
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaMainRoutingModule { }
