import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { MsalInterceptorConfiguration } from '@azure/msal-angular';
import { environment } from "./environments/environment";;

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: 'cd2a9055-d07a-4f32-be7a-dad06c34e309',
    authority: 'https://login.microsoftonline.com/ec703f7c-c099-4781-8cb1-385b3e7d4ae4',
    redirectUri: environment.redirectUri,
    //redirectUri: 'http://localhost:4200',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
});

//1. This tells MSAL how to acquire a token if one isn’t already cached
//2. Any HTTP request to https://apimgtsvc-davidatabaka.azure-api.net/ will be intercepted
//   and MSAL will automatically attach a Bearer token with the scope api://adf02463-0858-48d1-84ef-26231cd94d28/.default
export const msalInterceptorConfig: MsalInterceptorConfiguration = {
  interactionType: InteractionType.Redirect,
  protectedResourceMap: new Map<string, Array<string>>([
    ['https://apimgtsvc-davidatabaka.azure-api.net/', ['api://adf02463-0858-48d1-84ef-26231cd94d28/.default']],
  ]),
};
