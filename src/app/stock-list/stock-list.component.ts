import { Component } from '@angular/core';
import { StockService } from '../services/stock.service';
import { Stock } from '../models/stock';
import { NgIf, NgFor, NgClass, CurrencyPipe, PercentPipe } from '@angular/common'; // ✅ Import NgIf, NgFor, NgClass
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; // Column Definition Type Interface
import type { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { themeBalham, themeQuartz, themeMaterial } from 'ag-grid-community';
import { ScaleType } from '@swimlane/ngx-charts';

ModuleRegistry.registerModules([AllCommunityModule]); // Register modules

@Component({
  selector: 'app-stock-list',
  imports: [NgIf, NgFor, NgClass, AgGridAngular, NgxChartsModule], // ✅ Import NgIf, NgFor, NgClass
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss',
  providers: [CurrencyPipe, PercentPipe] 
})
export class StockListComponent {

  view: [number, number] = [350, 350]; // Width & height

  // Pie chart data
  pieChartDataSector: { name: string; value: number }[] = [];
  pieChartDataRatings: { name: string; value: number }[] = [];
  pieChartDataDividend: { name: string; value: number }[] = [];

  // Options
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  gradient = true;
  //colorScheme = { domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] };
  //colorScheme: string = 'night';  // Available options: 'cool', 'natural', 'vivid', etc.
  colorScheme = {
    domain: [
      '#556B2F', // Dark Olive Green
      '#6B8E23', // Olive Drab
      '#77815C', // Muted Sage
      '#5A6F64', // Deep Eucalyptus
      '#7A8B78', // Soft Fern
      '#8A9A91', // Cool Lichen
      '#6E7F70', // Mossy Rock
      '#9BA39B', // Pale Greenish Gray
      '#4D5D53', // Dark Sage
      '#B2BEB5'  // Ashy Sage
    ],
    name: 'greenish-gray-palette',  // Custom name for reference
    selectable: true,               // Allow users to select colors
    group: ScaleType.Ordinal        // Use 'ordinal' for categorical data
  };

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
      this.stocks = data;
      this.pieChartDataSector = this.groupStocksBySector(this.stocks);  
      this.pieChartDataRatings = this.groupStocksByRating(this.stocks);  
      this.pieChartDataDividend = this.groupStocksByDividend(this.stocks);
    },
    error: (err) => {
      console.error('Error fetching stocks:', err);
    }
  });
}

onSliceClick(event: any): void {
  console.log('Clicked Slice:', event);
  // For example, extracting the value:
  console.log('Clicked Slice Value:', event.value);
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
    { name: "0 - 0.99", min: 0, max: 0.99 },
    { name: "1.00 - 1.99", min: 1.00, max: 1.99 },
    { name: "2.00 - 2.99", min: 2.00, max: 2.99 },
    { name: "3.00 - 3.99", min: 3.00, max: 3.99 },
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


}
