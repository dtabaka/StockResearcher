import { Component } from '@angular/core';
import { StockService } from '../services/stock.service';
import { Stock } from '../models/stock';
import { NgIf, NgFor, NgClass, CurrencyPipe, PercentPipe } from '@angular/common'; // ✅ Import NgIf, NgFor, NgClass
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; // Column Definition Type Interface
import type { ColDef } from 'ag-grid-community'; // Column Definition Type Interface

import { themeBalham, themeQuartz, themeMaterial } from 'ag-grid-community';


ModuleRegistry.registerModules([AllCommunityModule]); // Register modules

@Component({
  selector: 'app-stock-list',
  imports: [NgIf, NgFor, NgClass, AgGridAngular], // ✅ Import NgIf, NgFor, NgClass
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss',
  providers: [CurrencyPipe, PercentPipe] 
})
export class StockListComponent {

// in component class
  public theme = themeMaterial;

  stocks: Stock[] = [];

// Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
  {
    headerName: 'Company',
    field: 'name',
    filter: 'agTextColumnFilter',
    cellRenderer: (params: any) => {
      const ticker = params.data?.ticker || ''; // Access ticker from row data
      const companyName = params.data?.name || ''; // Access company name from row data
      return `
          <div style="display: flex; align-items: center; gap: 8px;">
              <img 
                  src="assets/logos/${ticker}.png" 
                  alt="${ticker}" 
                  style="height: 20px; width: 20px;" 
                  onerror="this.onerror=null; this.src='assets/logos/default.png';"
              />
              <span style="padding-left:10px;">${companyName}</span>
          </div>`;
      }
    },
    {
      field: 'ticker',
      // explicitly configure column to use the Text Filter
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['apply' ,'clear' , 'reset' , 'cancel'],
        closeOnApply: true,
      },
    },
    {
      field: 'rating',
      // configure column to use the Number Filter
      filter: 'agNumberColumnFilter',
      filterParams: {
          // pass in additional parameters to the Number Filter
      },
      cellRenderer: (params: any) => {
        const value = params.value;
        let color = '#fdb515'; // Default color
        
        // Conditional logic to set chip color based on value
        if (value > 7) {
          color = '#0A5C36';  // Growth
        } else if (value < 5) {
          color = '#CC0000';    // Decline
        }

        // Returning the HTML for the chip with the conditional color
        return `<span style="background-color:${color}; border-radius: 5px; color: white; font-weight: bold; text-align: center; display:inline-block; vertical-align:middle;line-height:20px; min-width:50px;">${value}</span>`;
      },
      cellStyle: { 'text-align': 'center' },
    },
    {
      field: 'sector',
      // configure column to use the Number Filter
      filter: 'agTextColumanFilter',
      filterParams: {
          // pass in additional parameters to the Number Filter
      },
    },
    {
      field: 'industry',
      // configure column to use the Number Filter
      filter: 'agTextColumnFilter',
      filterParams: {
          // pass in additional parameters to the Number Filter
      },
    },
    {
      field: 'currentPrice',
      // configure column to use the Number Filter
      //filter: 'agNumberColumnFilter',
      valueFormatter: (params) => {
        // Format the value as currency
        return '$' + params.value.toFixed(2); // Format with 2 decimals
      }
    },
    {
      field: 'peRatio',
      // configure column to use the Number Filter
      //filter: 'agNumberColumnFilter',
      valueFormatter: (params) => {
        // Format the value as currency
        return params.value + 'x';
      }
    },
    {
      field: 'dividendYield',
      // configure column to use the Number Filter
      //filter: 'agNumberColumnFilter',
      valueFormatter: (params) => {
        // Format the value as currency
        return (params.value).toFixed(2) + '%';
      }
    },
    {
      field: 'buy',
      // configure column to use the Number Filter
      //filter: 'agNumberColumnFilter',
      valueFormatter: (params) => {
        // Format the value as currency
        return params.value + '%';
      }
    },
    {
      field: 'hold',
      // configure column to use the Number Filter
      //filter: 'agNumberColumnFilter',
      valueFormatter: (params) => {
        // Format the value as currency
        return params.value + '%';
      }
    },
    {
      field: 'sell',
      // configure column to use the Number Filter
      //filter: 'agNumberColumnFilter',
      valueFormatter: (params) => {
        // Format the value as currency
        return params.value + '%';
      }
    },
    {
      field: 'forecastHigh',
      // configure column to use the Number Filter
      //filter: 'agNumberColumnFilter',
      valueFormatter: (params) => {
        // Format the value as currency
        return '$' + params.value.toFixed(2); // Format with 2 decimals
      }
    },
    {
      field: 'forecastMedian',
      // configure column to use the Number Filter
      //filter: 'agNumberColumnFilter',
      valueFormatter: (params) => {
        // Format the value as currency
        return '$' + params.value.toFixed(2); // Format with 2 decimals
      }
    },
    {
      field: 'forecastLow',
      // configure column to use the Number Filter
      //filter: 'agNumberColumnFilter',
      valueFormatter: (params) => {
        // Format the value as currency
        return '$' + params.value.toFixed(2); // Format with 2 decimals
      }
    },
];

constructor(private stockService: StockService) {}

ngOnInit(): void {
  this.stockService.getStockData().subscribe({
    next: (data) => {
      //debugger; // 🔴 Pauses execution here for inspection
      this.stocks = data;
    },
    error: (err) => {
      console.error('Error fetching stocks:', err);
      //debugger; // 🔴 Pauses on error for detailed inspection
    }
  });
}

 


  // ngOnInit(): void {
  //   this.stockService.getStockData().subscribe({
  //     next: (data) => (this.stocks = data),
  //     error: (err) => console.error('Error fetching stocks:', err)
  //   });
  // }

}
