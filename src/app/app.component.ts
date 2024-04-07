import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from "./header/header.component";
import { NavigationComponent } from './navigation/navigation.component';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HeaderComponent, MatSidenavModule, NavigationComponent, FooterComponent]
})
export class AppComponent implements OnInit {

    constructor(private socialAuthService: SocialAuthService) { }

    ngOnInit(): void {

        this.socialAuthService.authState.subscribe((user) => {
            console.log(user);
        });
    }
}
