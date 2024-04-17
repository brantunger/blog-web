import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';
import { MatListModule } from '@angular/material/list';

declare var google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loggedIn: boolean = false;
  @Input() navItem: boolean = false;

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((value: boolean) => {
      this.loggedIn = value;
      this.cdr.detectChanges();
    });
    this.authService.loginFromStorage();
    this.initGoogleLogin();
    this.renderGoogleLogin();
  }

  initGoogleLogin(): void {
    google.accounts.id.initialize({
      client_id: '243613699796-gc3jh6r1esvcmjh97760827ucu1fem0d.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp)
    });

    // google.accounts.id.prompt(); // One-Tap
  }

  renderGoogleLogin(): void {
    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle'
    });
  }

  handleLogin(response: any): void {
    if (response) {
      this.authService.login(response);
    }
  }

  handleLogout(): void {
    this.authService.signOut();
    this.renderGoogleLogin();
  }
}
