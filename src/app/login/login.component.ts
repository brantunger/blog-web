import {AsyncPipe, NgIf} from "@angular/common";
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

declare var google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NgIf, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '243613699796-gc3jh6r1esvcmjh97760827ucu1fem0d.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp)
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle'
    });

    // google.accounts.id.prompt(); // One-Tap

    this.authService.loginFromStorage();
  }

  handleLogin(response: any) {
    if (response) {
      this.authService.login(response);
      this.cdr.detectChanges();
    }
  }

  handleLogout() {
    this.authService.signOut();
    this.cdr.detectChanges();
  }
}
