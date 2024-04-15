import {BehaviorSubject} from "rxjs";
import {Injectable} from '@angular/core';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private token: any;

  constructor() {
  }

  login(token: any): void {
    this.token = token;
    this.loggedIn.next(true);
    // const payload = this.decodeToken(token.credential);
    const payload = token.credential;
    sessionStorage.setItem('loggedInUser', payload);
  }

  loginFromStorage(): void {
    const token = sessionStorage.getItem('loggedInUser');
    if (token) {
      this.token = token;
      this.loggedIn.next(true);
    }
  }

  signOut(): void {
    this.token = undefined;
    this.loggedIn.next(false);
    sessionStorage.removeItem('loggedInUser');
    google.accounts.id.disableAutoSelect();
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
