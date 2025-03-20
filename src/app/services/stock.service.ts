import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Stock } from '../models/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = '/api/stocks';// 'https://api.example.com/stocks'; // Replace with actual API endpoint

  constructor(private http: HttpClient) {}

  /**
   * Fetches stock data from API
   */
  getStockData(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Fetches a single stock by symbol
   */
  getStockBySymbol(symbol: string): Observable<Stock> {
    return this.http.get<Stock>(`${this.apiUrl}/${symbol}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handles HTTP errors
   */
  private handleError(error: any) {
    console.error('Error fetching stock data:', error);
    return throwError(() => new Error('Error fetching stock data.'));
  }
}
