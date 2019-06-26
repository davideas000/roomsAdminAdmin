import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, Validators, ValidatorFn, ValidationErrors, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { RaAuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { RaHeaderTitleService } from '../../header/header-title.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  template: "<p i18n='sucessful profile update'>Perfil atualizado</p>",
  styles: ['p {margin: 0; padding: 0; text-align: center;}']
})
export class RaUpdateProfileSucessComponent {}

@Component({
  selector: 'ra-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class RaEditProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup = new FormGroup({
    name: new FormControl(
      '', Validators.compose(
        [Validators.required, Validators.minLength(5)]
      )),
    displayName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([
      Validators.email, Validators.required])),
    emailConfirmation: new FormControl('')
  }, this.emailConfrimationValidator());

  duplicateEmailError: boolean;

  loading = true;
  error = false;

  processing = false;

  @ViewChild('title') pageTitle: ElementRef;

  profile_$: Subscription;

  constructor(private title: Title,
              private headerTitle: RaHeaderTitleService,
              private authService: RaAuthService,
              private router: Router,
              private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.setTitle();
    this.profile_$ = this.authService.profile$
      .subscribe(
        user => {
          if (!user) return;
          this.profileForm.setValue({
            name: user.name,
            displayName: user.displayName,
            email: user.email,
            emailConfirmation: user.email
          });
          this.loading = false;
        },
        _ => {
          this.loading = false;
          this.error = true;
        }
      );
  }

  ngOnDestroy() {
    this.profile_$.unsubscribe();
  }

  private setTitle() {
    const titleStr = this.pageTitle.nativeElement
      .getAttribute('pageTitle');
    this.title.setTitle(titleStr);
    this.headerTitle.setTitle(titleStr);
  }

  get email() {
    return this.profileForm.get('email');
  }

  get name() {
    return this.profileForm.get('name');
  }

  get displayName() {
    return this.profileForm.get('displayName');
  }

  get emailConfirmation() {
    return this.profileForm.get('emailConfirmation');
  }

  update() {
    this.processing = true;
    this.authService.updateProfile(this.profileForm.value)
      .pipe(first())
      .subscribe(
        _ => {
          this.snackBar.openFromComponent(
            RaUpdateProfileSucessComponent, {duration: 1000});
          this.processing = false;
          this.router.navigate(['/main/profile/show']);
        },
        e => {
          this.processing = false;
          if (e.error.message === 'duplicate-email') {
            this.duplicateEmailError = true;
          } else {
            this.error = true;
          }
        }
      );
  }

  cancel() {
    this.router.navigate(['/main/profile/show']);
  }

  onAlertClose() {
    this.duplicateEmailError = false;
  }

  emailConfrimationValidator(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const email = control.get('email');
      const emailCon = control.get('emailConfirmation');
      if (email.value !== emailCon.value) {
        emailCon.setErrors({'emailConfirmation': true});
        emailCon.markAsTouched();
        return { 'emailConfirmation': true };
      } else {
        emailCon.setErrors(null);
        return null;
      }
    }
  }
}
