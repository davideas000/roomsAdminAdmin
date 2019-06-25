import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RaMainComponent } from './main.component';
import { roomsPagesRoutes } from './rooms-pages/rooms-pages-routes';
import { newReservationRoutes } from './new-reservation/new-reservation-routes';
import { reservationsPagesRoutes, reservationsPagesRoot } from './reservations-pages/reservations-pages-routes';
import { notificationsRoutes } from './notifications-pages/notifications-routes';
import { RaAuthGuard } from '../auth/auth.guard';
import { profilePagesRoutes } from './profile-pages/profile-pages-routes';

const routes: Routes = [
  {
    path: 'main',
    component: RaMainComponent,
    canActivate: [RaAuthGuard],
    children: [
      {path: '', redirectTo: reservationsPagesRoot, pathMatch: 'full'},
      reservationsPagesRoutes,
      notificationsRoutes,
      roomsPagesRoutes,
      newReservationRoutes,
      profilePagesRoutes
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaMainRoutingModule { }
