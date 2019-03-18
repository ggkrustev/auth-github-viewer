import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MainComponent } from './main.component';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { ClarityModule } from '@clr/angular';

describe('AppComponent', () => {
  const username = 'John';
  const authService = {
    user: new BehaviorSubject(username)
  } as any;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ClarityModule],
      declarations: [MainComponent],
      providers: [{
        provide: AuthService, useFactory: () => authService
      }]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MainComponent);
    const main = fixture.debugElement.componentInstance;
    expect(main).toBeTruthy();
  });
});
