declare var google: any;
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService) {}

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
  }

  handleLogin(response: any) {
    if (response) {
      this.authService.login(response);
    }
  }
  
  handleLogout() {
    this.authService.signOut();
  }
}
