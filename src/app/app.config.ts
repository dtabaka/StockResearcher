import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule, InMemoryWebApiModule  } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false})),
 
    // {
    //   provide: HttpClientInMemoryWebApiModule,
    //   useFactory: () => HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)
    // }
  ]
};
