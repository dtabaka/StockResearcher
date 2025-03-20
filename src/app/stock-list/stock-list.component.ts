import { Component, OnInit } from '@angular/core';
import { StockService } from '../services/stock.service';
import { Stock } from '../models/stock';
import { NgIf, NgFor, NgClass } from '@angular/common'; // ✅ Import NgIf, NgFor, NgClass
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community'; // Column Definition Type Interface
import type { ColDef } from 'ag-grid-community'; // Column Definition Type Interface

ModuleRegistry.registerModules([AllCommunityModule]); // Register modules

@Component({
  selector: 'app-stock-list',
  imports: [NgIf, NgFor, NgClass, AgGridAngular], // ✅ Import NgIf, NgFor, NgClass
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss'
})
export class StockListComponent {
  stocks: Stock[] = [];


  // Row Data: The data to be displayed.
  // rowData = [
  //   { make: "Tesla", model: "Model Y", price: 64950, electric: true },
  //   { make: "Ford", model: "F-Series", price: 33850, electric: false },
  //   { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  //];

// Column Definitions: Defines the columns to be displayed.
colDefs: ColDef[] = [

  {
    headerName: 'Logo',
    field: 'ticker',
    // cellRenderer: (params: any) => {
    //   const ticker = params.value;
    //   return `<img src="assets/logos/${ticker}.png" alt="${ticker}" style="height: 20px; width: 20px; margin-top:10px;" />`;
    // }
    cellRenderer: (params: any) => {
      const ticker = params.value;
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
    },
    {
      field: 'sector',
      // configure column to use the Number Filter
      filter: 'agTextColumnFilter',
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
  }
];

  constructor(private stockService: StockService) {}
 
  ngOnInit(): void {
    this.stockService.getStockData().subscribe({
      next: (data) => {
        debugger; // 🔴 Pauses execution here for inspection
        this.stocks = data;
      },
      error: (err) => {
        console.error('Error fetching stocks:', err);
        debugger; // 🔴 Pauses on error for detailed inspection
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
