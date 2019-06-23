import { Route } from "@angular/router";
import { RaNotificationsAllComponent } from "./notifications-all/notifications-all.component";
import { RaNotificationsDetailsComponent } from "./notifications-details/notifications-details.component";
import { RaNotificationsPagesComponent } from "./notifications-pages.component";

export const notificationsRoutes: Route = {
  path:  'notifications',
  component: RaNotificationsPagesComponent,
  children: [
    {path: '', redirectTo: 'all', pathMatch: 'full'},
    {path: 'all', component: RaNotificationsAllComponent},
    {path: ':id', component: RaNotificationsDetailsComponent}
  ]
};
