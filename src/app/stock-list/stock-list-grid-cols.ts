import { ColDef } from 'ag-grid-community';
// Column Definitions: Defines the columns to be displayed.
export const colDefs: ColDef[] = [
  {
    headerName: 'Company',
    field: 'name',
    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['apply' ,'clear' , 'reset' , 'cancel'],
      closeOnApply: true,
    },
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
      headerName: 'RATING',
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
      headerName: 'P/E Ratio',
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