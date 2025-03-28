export interface Stock {
    buy: number;
    hold: number;
    sell: number;
    name: string;
    about?: string | null;
    ticker: string;
    sector?: string | null;
    industry?: string | null;
    peRatio: number;
    dividendYield: number;
    rating: number;
    forecastHigh: number;
    percentageHigh: number;
    forecastMedian: number;
    percentageMedian: number;
    forecastLow: number;
    percentageLow: number;
    currentPrice: number;
    updatedDate: string;
  }