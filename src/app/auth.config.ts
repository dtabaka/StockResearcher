import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { MsalInterceptorConfiguration } from '@azure/msal-angular';

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: 'cd2a9055-d07a-4f32-be7a-dad06c34e309',
    authority: 'https://login.microsoftonline.com/ec703f7c-c099-4781-8cb1-385b3e7d4ae4',
    redirectUri: 'http://localhost:4200/auth-redirect',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
});

export const msalInterceptorConfig: MsalInterceptorConfiguration = {
  interactionType: InteractionType.Redirect,
  protectedResourceMap: new Map<string, Array<string>>([
    ['https://apimgtsvc-davidatabaka.azure-api.net/', ['api://adf02463-0858-48d1-84ef-26231cd94d28/.default']],
  ]),
};
