import { Route } from '@angular/router';
import { RaReservationsApprovedComponent } from './reservations-approved/reservations-approved.component';
import { RaReservationsPendingComponent } from './reservations-pending/reservations-pending.component';
import { RaReservationsPagesComponent } from './reservations-pages.component';
import { RaReservationsApprovedDepComponent } from './reservations-approved-dep/reservations-approved-dep.component';
import { RaReservationsPendingDepComponent } from './reservations-pending-dep/reservations-pending-dep.component';

export const reservationsPagesRoot = 'rsrvs';

export const reservationsPagesRoutes: Route = {
  path: 'rsrvs',
  component: RaReservationsPagesComponent,
  children:[
    {path: '', redirectTo: 'approved', pathMatch: 'full'},
    {path: 'approved', component: RaReservationsApprovedComponent},
    {path: 'pending', component: RaReservationsPendingComponent},
    {path: 'dapproved', component: RaReservationsApprovedDepComponent},
    {path: 'dpending', component: RaReservationsPendingDepComponent}
  ]
};
