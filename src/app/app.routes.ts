import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockListComponent } from './stock-list/stock-list.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    {
      path: 'stocks', // URL path for the stock list
      component: StockListComponent
    },
    {
      path: 'about', // URL path for the stock list
      component: AboutComponent
    },
    {
      path: 'services', // URL path for the stock list
      component: ServicesComponent
    },
    {
      path: 'contact', // URL path for the stock list
      component: ContactComponent
    },
    {
      path: '', // Redirect to a default route or home page
      redirectTo: '/stocks',  // Set the default route here (e.g., show stock list by default)
      pathMatch: 'full'
    },
    {
      path: '**', // Wildcard route for undefined paths
      redirectTo: '/stocks'  // Redirect undefined paths to stock list or another default
    }
  ];
 