import {BehaviorSubject} from "rxjs";
import {Injectable} from '@angular/core';
import {User} from "./user";

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public user: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  private token: any;

  constructor() {
  }

  login(token: any): void {
    this.token = token;
    this.loggedIn.next(true);
    const payload = token.credential;
    this.user.next(this.getUserFromToken(payload));
    sessionStorage.setItem('loggedInUser', payload);
  }

  loginFromStorage(): void {
    const token = sessionStorage.getItem('loggedInUser');
    if (token) {
      this.token = token;
      this.user.next(this.getUserFromToken(token));
      this.loggedIn.next(true);
    }
  }

  signOut(): void {
    this.token = undefined;
    this.user.next({} as User)
    this.loggedIn.next(false);
    sessionStorage.removeItem('loggedInUser');
    google.accounts.id.disableAutoSelect();
  }

  private decodeToken(token: string): any {
    return JSON.parse(atob(token.split('.')[1]));
  }

  private getUserFromToken(token: string): User {
    const user: User = {} as User;
    if (token) {
      const credentials = this.decodeToken(token);
      user.email = credentials.email;
      user.firstName = credentials.given_name;
      user.lastName = credentials.family_name;
      user.picture = credentials.picture;
    }
    return user;
  }
}
