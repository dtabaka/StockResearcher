export interface Stock {
    buy: number;
    hold: number;
    sell: number;
    name: string;
    about?: string | null;
    ticker: string;
    sector: string;
    //industry?: string | null;
    industry: string;
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