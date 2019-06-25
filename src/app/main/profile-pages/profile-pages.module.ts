import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { RaProfileComponent } from './profile/profile.component';
import { RaEditProfileComponent, RaUpdateProfileSucessComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    RaProfileComponent,
    RaEditProfileComponent,
    RaUpdateProfileSucessComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    RaAngularMaterialModule,
    SharedModule
  ],
  entryComponents: [ RaUpdateProfileSucessComponent ]
})
export class RaProfilePagesModule { }
