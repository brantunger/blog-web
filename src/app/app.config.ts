import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { JwtModule } from '@auth0/angular-jwt';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('243613699796-gc3jh6r1esvcmjh97760827ucu1fem0d.apps.googleusercontent.com',
              {
                oneTapEnabled: false,
                scopes: 'openid profile email',
              }
            )
          }
        ]
      }
    },
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: () => {
            return sessionStorage.getItem('id_token');
          }
        }
      }),
    )
  ]
};
