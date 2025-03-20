import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueryBuilderComponent } from './querybuilder/querybuilder.component';
import { StockListComponent } from './stock-list/stock-list.component';

export const routes: Routes = [
    {
      path: 'querybuilder', // URL path for the query builder
      component: QueryBuilderComponent
    },
    {
      path: 'stocks', // URL path for the stock list
      component: StockListComponent
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
 