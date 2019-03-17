import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private loginForm: FormGroup;
  private subscription: Subscription;

  public errorMessage = 'Invalid user name or password';
  public showError = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    // TODO: remove defaults before go in production
    this.loginForm = this.formBuilder.group({
      username: ['john@vmware.com'],
      password: ['123456']
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get controls() {
    return this.loginForm.controls;
  }

  login() {
    this.subscription = this.authService
      .login({
        username: this.controls.username.value,
        password: this.controls.password.value
      })
      .subscribe(
        data => {
          if (data) {
            this.router.navigate(['']);
          }
        },
        error => {
          this.errorMessage = error.error;
          this.showError = true;
        }
      );
  }
}
