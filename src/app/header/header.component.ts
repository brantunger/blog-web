import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {LoginComponent} from "../login/login.component";
import {AuthService} from "../auth.service";
import {User} from "../user";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterModule, LoginComponent]
})
export class HeaderComponent implements OnInit {
  user?: User;
  @Output() public sideNavToggle: EventEmitter<any> = new EventEmitter();

  constructor(public authService: AuthService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.authService.user.subscribe((user: User): void => {
      this.user = user;
      this.cdr.detectChanges();
    });
  }

  openSideNav(): void {
    this.sideNavToggle.emit();
  }
}
