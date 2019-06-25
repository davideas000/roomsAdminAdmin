import { Route } from '@angular/router';
import { RaProfilePagesComponent } from './profile-pages.component';
import { RaProfileComponent } from './profile/profile.component';
import { RaEditProfileComponent } from './edit-profile/edit-profile.component';

export const profilePagesRoutes: Route = {
  path: 'profile',
  component: RaProfilePagesComponent,
  children:[
    {path: '', redirectTo: 'show', pathMatch: 'full'},
    {path: 'show', component: RaProfileComponent},
    {path: 'edit', component: RaEditProfileComponent}
  ]
};
