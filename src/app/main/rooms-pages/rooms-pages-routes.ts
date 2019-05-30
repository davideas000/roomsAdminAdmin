import { Route } from '@angular/router';
import { RaRoomsDetailsComponent } from './rooms-details/rooms-details.component';
import { RaRoomsPagesComponent } from './rooms-pages.component';

export const roomsPagesRoutes: Route = {
  path: 'rooms',
  component: RaRoomsPagesComponent,
  children: [
    {path: ':id', component: RaRoomsDetailsComponent}
  ]
};
