import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from "./header/header.component";
import { NavigationComponent } from './navigation/navigation.component';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HeaderComponent, MatSidenavModule, NavigationComponent, FooterComponent]
})
export class AppComponent implements OnInit {

    constructor(
        private socialAuthService: SocialAuthService,
        private jwtHelperService: JwtHelperService,
        private cookieService: CookieService
    ) { }

    ngOnInit(): void {
        const idToken = this.getIdToken();

        if (idToken) {
            console.log(idToken);
            console.log(this.jwtHelperService.decodeToken(idToken));
        }

        this.socialAuthService
            .authState
            .subscribe((user: SocialUser) => {
                const token = user.idToken;
                const expiresOnDay = this.jwtHelperService.getTokenExpirationDate(token)?.getTime();
                const expiresOnDate = new Date(expiresOnDay as number);
                this.cookieService.set('id_token', token, expiresOnDate);
            });
    }

    getIdToken(): string {
        return this.cookieService.get('id_token');
    }
}
