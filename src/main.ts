// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { msalInstance } from './app/auth.config'; // adjust path if needed

(async () => {
  try {
    await msalInstance.initialize(); // 👈 This is the missing step
    await bootstrapApplication(AppComponent, appConfig);
  } catch (err) {
    console.error('Bootstrap failed:', err);
  }
})();
