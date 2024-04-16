import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { LoginComponent } from "../login/login.component";

@Component({
    selector: 'app-navigation',
    standalone: true,
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss',
    imports: [MatListModule, MatIconModule, RouterModule, LoginComponent]
})
export class NavigationComponent {
  @Output() onNavLinkClick = new EventEmitter();

  navigationClose(): void {
    this.onNavLinkClick.emit();
  }
}
