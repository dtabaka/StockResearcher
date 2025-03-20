export interface Stock {
    buy: number;
    hold: number;
    sell: number;
    name: string;
    ticker: string;
    sector: string;
    industry: string;
    peratio: number;
    dividendYield: number;
    rating: number;
    forecastHigh: number;
    percentageHigh: number;
    forecastMedian: number;
    percentageMedian: number;
    forecastLow: number;
    percentageLow: number;
    currentPrice: number;
    updatedDate: Date;
  }