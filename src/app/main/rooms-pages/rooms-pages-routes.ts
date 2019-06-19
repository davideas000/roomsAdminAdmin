import { Route } from '@angular/router';
import { RaRoomsDetailsComponent } from './rooms-details/rooms-details.component';
import { RaRoomsPagesComponent } from './rooms-pages.component';
import { RaRoomsAllComponent } from './rooms-all/rooms-all.component';

export const roomsPagesRoutes: Route = {
  path: 'rooms',
  component: RaRoomsPagesComponent,
  children: [
    {path: 'all', component: RaRoomsAllComponent},
    {path: ':id', component: RaRoomsDetailsComponent}
  ]
};
