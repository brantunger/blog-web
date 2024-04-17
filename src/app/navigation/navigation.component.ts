import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from '@angular/router';
import {LoginComponent} from "../login/login.component";
import {User} from "../user";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-navigation',
  standalone: true,
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  imports: [MatListModule, MatIconModule, RouterModule, LoginComponent]
})
export class NavigationComponent implements OnInit {
  user?: User;
  @Output() onNavLinkClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.authService.user.subscribe((user: User): void => {
      this.user = user;
      this.cdr.detectChanges();
    });
  }

  navigationClose(): void {
    this.onNavLinkClick.emit();
  }
}
