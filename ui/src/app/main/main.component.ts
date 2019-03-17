import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public username: string;

  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit() {
    this.subscription = this.authService.user.subscribe(name => {
      this.username = name;
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
