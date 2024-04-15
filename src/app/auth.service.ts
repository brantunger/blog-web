declare var google: any;
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: boolean = false;
  private token: any;

  constructor() { }

  login(token: any): void {
    this.token = token;
    this.loggedIn = true;
    // const payload = this.decodeToken(token.credential);
    const payload = token.credential;
    console.log(payload);
    sessionStorage.setItem('loggedInUser', payload);
  }

  loginFromStorage(): void {
    const token = sessionStorage.getItem('loggedInUser');
    if(token) {
      this.token = token;
      this.loggedIn = true;
    }
  }

  signOut(): void {
    this.token = undefined;
    this.loggedIn = false;
    sessionStorage.removeItem('loggedInUser');
    google.accounts.id.disableAutoSelect();
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
