// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-msaldemo',
//   imports: [],
//   templateUrl: './msaldemo.component.html',
//   styleUrl: './msaldemo.component.scss'
// })
// export class MsaldemoComponent {

// }


import { Component } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthenticationResult, EventType, InteractionStatus } from '@azure/msal-browser';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-msal-demo',
  standalone: true,
  templateUrl: "./msaldemo.component.html",
  imports: [CommonModule],
})
export class MsaldemoComponent {

  loggedIn: boolean = false;
  private authState$ = new BehaviorSubject<boolean>(false);
  
  constructor(private msalService: MsalService, private msalBroadcast: MsalBroadcastService, private http: HttpClient) {

    this.msalBroadcast.inProgress$
      .pipe(
        filter(status => status === InteractionStatus.None),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        const accounts = this.msalService.instance.getAllAccounts();
        if (accounts.length > 0) {
          this.msalService.instance.setActiveAccount(accounts[0]);
          this.authState$.next(true);
          this.authState.set(true);
        } else {
          this.authState$.next(false);
          this.authState.set(false);
        }
      });

    // Optional: listen for login/logout events to update state reactively
    this.msalBroadcast.msalSubject$
      .pipe(
        filter(event =>
          event.eventType === EventType.LOGIN_SUCCESS ||
          event.eventType === EventType.LOGOUT_SUCCESS
        ),
        takeUntilDestroyed()
      )
      .subscribe(event => {
        if (event.eventType === EventType.LOGIN_SUCCESS) {
          const payload = event.payload as AuthenticationResult;
          this.msalService.instance.setActiveAccount(payload.account);
          this.authState$.next(true);
        } else if (event.eventType === EventType.LOGOUT_SUCCESS) {
          this.authState$.next(false);
        }
      });

  }

  authState = signal(false);

  ngOnInit(): void {
 
    this.msalService.handleRedirectObservable().subscribe({
      next: (result) => {
        if (result) {
          console.log('Login success:', result);
          this.msalService.instance.setActiveAccount(result.account);
        }
      },
      error: (error) => {
        console.error('Redirect error:', error);
      }
    });

  
  }
  
  isAuthenticated() {
    debugger
    return this.authState$.value;
  }

  login() {
    this.msalService.loginRedirect({
      scopes: ['api://adf02463-0858-48d1-84ef-26231cd94d28/.default'],
    });
  }

  logout() {
    this.msalService.logoutRedirect();
    // this.msalService.logoutRedirect({
    //   postLogoutRedirectUri: 'http://localhost:4200'
    // });
    this.msalService.instance.setActiveAccount(null);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  apiResponse: any;

  callApi() {
    this.http.get('https://apimgtsvc-davidatabaka.azure-api.net/StockResearcherFunctionApp/GetStockByTicker?ticker=MRVL')
    .subscribe({
      next: (res) => {
        console.log('API response:', res)
        this.apiResponse = res;
      },
      error: (err) => {
        console.error('API error:', err)
      },
    });
  }
 
}