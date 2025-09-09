import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule, InMemoryWebApiModule  } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { MsalModule, MsalInterceptor } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';

import { routes } from './app.routes';
import { msalInstance, msalInterceptorConfig } from './auth.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(

      //HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false}),
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
        passThruUnknownUrl: true,
        dataEncapsulation: false
      }),
      
      MsalModule.forRoot(
        msalInstance,
        {
          interactionType: InteractionType.Redirect,
          authRequest: {
            scopes: ['api://adf02463-0858-48d1-84ef-26231cd94d28/.default']
          }
        },
        msalInterceptorConfig
      )
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ]
};
