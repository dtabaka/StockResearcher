import { Component, ViewChild } from '@angular/core';
import { StockService } from '../services/stock.service';
import { Stock } from '../models/stock';
import { NgIf, NgFor, NgClass, CurrencyPipe, PercentPipe } from '@angular/common'; // ✅ Import NgIf, NgFor, NgClass
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { AllCommunityModule, ModuleRegistry, GridOptions, GridApi, ColDef } from 'ag-grid-community'; // Column Definition Type Interface
//import type { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { themeBalham, themeQuartz, themeMaterial } from 'ag-grid-community';
import { ScaleType } from '@swimlane/ngx-charts';
import { AppStateService } from '../services/appstate.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { PieChartComponent } from "../pie-chart/pie-chart.component";

ModuleRegistry.registerModules([AllCommunityModule]); // Register modules

@Component({
  selector: 'app-stock-list',
  imports: [NgIf, NgFor, NgClass, AgGridAngular, NgxChartsModule, MatChipsModule, MatIconModule, PieChartComponent, MatSidenavModule], // ✅ Import NgIf, NgFor, NgClass
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss',
  providers: [CurrencyPipe, PercentPipe] 
})
export class StockListComponent {

  view: [number, number] = [400, 400]; // Width & height

  // Pie chart data
  pieChartDataSector: { name: string; value: number }[] = [];
  pieChartDataRatings: { name: string; value: number }[] = [];
  pieChartDataDividend: { name: string; value: number }[] = [];

// in component class
  public theme = themeMaterial.withParams({
    accentColor: '#6B8E23'
});

  stocks: Stock[] = [];

  filters: { [key: string]: any } = {};
 
  objectKeys = Object.keys; // Directly reference Object.keys

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
      filter: 'agNumberColumnFilter',
      valueFormatter: (params) => {
        // Format the value as currency
        return (params.value).toFixed(2);// + '%';
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

gridApi!: GridApi;  // Store the grid API instance

constructor(private stockService: StockService, private appStateService: AppStateService) {}

ngOnInit(): void {
  this.stockService.getStockData().subscribe({
    next: (data) => {
      this.stocks = data;
      this.pieChartDataSector = this.groupStocksBySector(this.stocks);  
      this.pieChartDataRatings = this.groupStocksByRating(this.stocks);  
      this.pieChartDataDividend = this.groupStocksByDividend(this.stocks);

      this.appStateService.filterState$.subscribe(filters => {
        this.filters = filters;

        this.buildGridFilter();

      });

    },
    error: (err) => {
      console.error('Error fetching stocks:', err);
    }
  });
}

 // Capture the API on grid ready
 onGridReady(params: any) {
  this.gridApi = params.api;
}

buildGridFilter() {

  // const filterModel = Object.keys(this.filters).reduce((acc, key) => {
  //   const normalizedKey = key.toLowerCase(); // Normalize keys to match AG Grid field names
  //   const value = this.filters[key]; // Directly get the value
  //   const isNumber = !isNaN(value) && value !== ''; // Check if it's a number
  
  //   acc[normalizedKey] = {
  //     filterType: isNumber ? 'number' : 'text',
  //     type: 'equals', // Defaulting to 'equals' since it's not specified in filters
  //     filter: isNumber ? Number(value) : value // Convert to number if applicable
  //   };
  
  //   return acc;
  // }, {} as any);

  // const filterModel = Object.keys(this.filters).reduce((acc, key) => {
  //   const normalizedKey = key; //.toLowerCase(); // Normalize keys to match AG Grid field names
  //   const value = this.filters[key]; // Get the value
  //   const isNumber = !isNaN(value) && value !== ''; // Check if it's a number
  
  //   // Check if value is a range (e.g., "3-3.99")
  //   const rangeMatch = typeof value === 'string' ? value.match(/^(\d+(\.\d+)?)\s*-\s*(\d+(\.\d+)?)$/) : null;
    
  //   if (normalizedKey === 'dividendYield' && rangeMatch) {
  //     // If a range is detected, extract min/max and apply AG Grid's number filter
  //     acc[normalizedKey] = {
  //       filterType: 'number',
  //       operator: 'AND', // Ensures both min & max filters apply
  //       conditions: [
  //         { type: 'greaterThanOrEqual', filter: parseFloat(rangeMatch[1]) },
  //         { type: 'lessThanOrEqual', filter: parseFloat(rangeMatch[3]) }
  //       ]
  //     };
  //   } else {
  //     // Standard filter logic for other fields
  //     acc[normalizedKey] = {
  //       filterType: isNumber ? 'number' : 'text',
  //       type: 'equals', // Default to 'equals'
  //       filter: isNumber ? Number(value) : value // Convert to number if applicable
  //     };
  //   }
  
  //   return acc;
  // }, {} as any);

  const filterModel = Object.keys(this.filters).reduce((acc, key) => {
    const normalizedKey = key; // Keep the original key names
    const value = this.filters[key]; // Get the value
    const isNumber = !isNaN(value) && value !== ''; // Check if it's a number
  
    // Check if value is a range (e.g., "3-3.99")
    const rangeMatch = typeof value === 'string' ? value.match(/^(\d+(\.\d+)?)\s*-\s*(\d+(\.\d+)?)$/) : null;
    
    // Check if value is "4.00 and above"
    const aboveMatch = typeof value === 'string' ? value.match(/^(\d+(\.\d+)?)\s*and above$/i) : null;
  
    if (normalizedKey === 'dividendYield' && rangeMatch) {
      // If a range is detected, apply AG Grid's number filter
      acc[normalizedKey] = {
        filterType: 'number',
        operator: 'AND', // Ensures both min & max filters apply
        conditions: [
          { type: 'greaterThanOrEqual', filter: parseFloat(rangeMatch[1]) },
          { type: 'lessThanOrEqual', filter: parseFloat(rangeMatch[3]) }
        ]
      };
    } else if (normalizedKey === 'dividendYield' && aboveMatch) {
      // Handle "4.00 and above"
      acc[normalizedKey] = {
        filterType: 'number',
        type: 'greaterThanOrEqual',
        filter: parseFloat(aboveMatch[1])
      };
    } else {
      // Standard filter logic for other fields
      acc[normalizedKey] = {
        filterType: isNumber ? 'number' : 'text',
        type: 'equals', // Default to 'equals'
        filter: isNumber ? Number(value) : value // Convert to number if applicable
      };
    }
  
    return acc;
  }, {} as any);
  
  if (this.gridApi && Object.keys(filterModel).length > 0) {
    this.gridApi.setFilterModel(filterModel);
  }
 
  // this.gridApi.setFilterModel({
  //   sector: {
  //     filterType: 'text',
  //     type: 'equals',
  //     filter: 'Producer Manufacturing'
  //   },
  //   rating: {
  //     filterType: 'number',
  //     type: 'equals',
  //     filter: 6
  //   },
  //   dividendYield: {
  //     filterType: 'number',
  //     operator: 'AND',
  //     conditions: [
  //       { type: 'greaterThanOrEqual', filter: 1 },
  //       { type: 'lessThanOrEqual', filter: 1.99 }
  //     ]
  //   }
  //});

  //This works! Need to replicate.
  // this.gridApi.setFilterModel({
  //   sector: {
  //     filterType: 'text',
  //     type: 'contains',
  //     filter: 'Health'
  //   },
  //   rating: {
  //     filterType: 'number',
  //     type: 'equals',
  //     filter: 8
  //   }
  // });

}

onFilterChanged() {
  debugger
  if (this.gridApi) {
    console.log(this.gridApi.getFilterModel());
  }
}

removeFilter(key: string) {
  // delete this.filters[key];
  // this.filters = { ...this.filters }; // Ensure change detection
  this.appStateService.removeFilter(key);
}

groupStocksBySector(stocks: Stock[]): { name: string; value: number }[] {
  const grouped = stocks.reduce((acc, stock) => {
    acc[stock.sector] = (acc[stock.sector] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  return Object.entries(grouped).map(([sector, count]) => ({
    name: sector,
    value: count
  }));
}

groupStocksByRating(stocks: Stock[]): { name: string; value: number }[] {
  const grouped = stocks.reduce((acc, stock) => {
    acc[stock.rating] = (acc[stock.rating] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  return Object.entries(grouped).map(([rating, count]) => ({
    name: rating,
    value: count
  }));
}

groupStocksByDividend(stocks: Stock[]): { name: string; value: number }[] {
  const ranges = [
    { name: "0-0.99", min: 0, max: 0.99 },
    { name: "1.00-1.99", min: 1.00, max: 1.99 },
    { name: "2.00-2.99", min: 2.00, max: 2.99 },
    { name: "3.00-3.99", min: 3.00, max: 3.99 },
    { name: "4.00 and above", min: 4.00, max: Infinity }
  ];

  const grouped = stocks.reduce((acc, stock) => {
    const dividend = stock.dividendYield; // Assuming stock has a 'dividend' property
    const range = ranges.find(r => dividend >= r.min && dividend <= r.max);
    if (range) {
      acc[range.name] = (acc[range.name] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(grouped).map(([name, value]) => ({ name, value }));
}

@ViewChild('sidenav') sidenav!: MatSidenav; // Access sidenav
selectedRowData: any;

onCellClicked(event: any) {
  debugger
  this.selectedRowData = event.data;
  this.sidenav.open();
}
 
}
