import { Component } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthenticationResult, EventType, InteractionStatus } from '@azure/msal-browser';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-msal-demo',
  standalone: true,
  templateUrl: "./msaldemo.component.html",
  styleUrls: ['./msaldemo.component.scss'],
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule],
})
export class MsaldemoComponent {
  loading = false;
  loggedIn: boolean = false;
  private authState$ = new BehaviorSubject<boolean>(false);

  constructor(private msalService: MsalService, private msalBroadcast: MsalBroadcastService, private http: HttpClient) {

  this.msalBroadcast.inProgress$
    .pipe(
      filter(status => status === InteractionStatus.None), 
      takeUntilDestroyed())
    .subscribe(() => this.updateAuthState());

  this.msalBroadcast.msalSubject$
    .pipe(
      filter(event =>
        event.eventType === EventType.LOGIN_SUCCESS ||
        event.eventType === EventType.LOGOUT_SUCCESS
      ),
      takeUntilDestroyed()
    )
    .subscribe(() => this.updateAuthState());
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

  private updateAuthState() {
 
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      debugger
      this.msalService.instance.setActiveAccount(accounts[0]);
      this.authState.set(true);
      //this.authState$.next(true);
    } else {
      this.authState.set(false);
      //this.authState$.next(false);
    }
  }
  
  isAuthenticated() {
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

  apiResponse: any;

  callApi() {
    this.loading = true;
    this.http.get('https://apimgtsvc-davidatabaka.azure-api.net/StockResearcherFunctionApp/GetStockByTicker?ticker=MRVL')
    .subscribe({
      next: (res) => {
        console.log('API response:', res)
        this.apiResponse = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('API error:', err)
        this.loading = false;
      },
    });
  }
 
}