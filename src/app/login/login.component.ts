import { Component, OnInit } from '@angular/core';
import { RaAuthService } from '../auth/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'ra-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class RaLoginComponent implements OnInit {
  loading = false;
  errorCode: string;
  error: boolean = false;

  constructor(public authService: RaAuthService) { }

  ngOnInit() {}

  login(loginFormValue: {email: string, password: string}) {
    this.loading = true;
    this.clearErrorMessage();
    this.authService.login(
      loginFormValue.email,
      loginFormValue.password
    ).pipe(
      first()
    ).subscribe(_ => {
      this.loading = false;
    }, e => {
      this.loading = false;
      this.errorCode = e.error.message;
      this.error = true;
    });
  }

  clearErrorMessage() {
    this.error = false;
    this.errorCode = null;
  }
}
