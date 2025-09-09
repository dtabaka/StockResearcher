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
import { MsalService } from '@azure/msal-angular';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-msal-demo',
  standalone: true,
  templateUrl: "./msaldemo.component.html",
  imports: [],
})
export class MsaldemoComponent {

  loggedIn: boolean = false;

  constructor(private msalService: MsalService, private http: HttpClient) {}

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


    this.loggedIn = this.msalService.instance.getActiveAccount() !== null;

    // Optionally subscribe to MSAL events for dynamic updates
    this.msalService.instance.addEventCallback((event) => {
      if (event.eventType === 'msal:loginSuccess') {
        this.loggedIn = true;
      }
      if (event.eventType === 'msal:logoutSuccess') {
        this.loggedIn = false;
      }
    });

  }

  login() {
    this.msalService.loginRedirect({
      scopes: ['api://adf02463-0858-48d1-84ef-26231cd94d28/.default'],
    });
  }

  logout() {
    //this.msalService.logoutRedirect();
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200'
     
    });

    // this.msalService.logoutPopup({
    //   mainWindowRedirectUri: 'http://localhost:4200'
    //   this.msalService.instance.setActiveAccount(null);
    // });
    this.msalService.instance.setActiveAccount(null);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  callApi() {
    this.http.get('https://apimgtsvc-davidatabaka.azure-api.net/StockResearcherFunctionApp/GetStockByTicker?ticker=MRVL')
    .subscribe({
      next: (res) => {
        console.log('API response:', res)
      },
      error: (err) => {
        console.error('API error:', err)
      },
    });
  }
 
}