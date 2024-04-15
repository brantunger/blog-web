import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { LoginComponent } from "../login/login.component";

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterModule, LoginComponent]
})
export class HeaderComponent {
  @Output() public sideNavToggle = new EventEmitter();

  openSideNav(): void {
    this.sideNavToggle.emit();
  }
}
