import { Injectable } from '@angular/core';
import { DeferBlockBehavior } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  // BehaviorSubject to hold the filter state
  private filterState = new BehaviorSubject<{ [key: string]: any }>({});

  // Observable to expose filter state updates
  filterState$: Observable<{ [key: string]: any }> = this.filterState.asObservable();

  // Method to update a filter value
  setFilter(key: string, value: any): void {
    const currentFilters = this.filterState.getValue();
    this.filterState.next({ ...currentFilters, [key]: value });
  }

  // Method to remove a filter
  removeFilter(key: string): void {
    const currentFilters = this.filterState.getValue();
    const { [key]: _, ...updatedFilters } = currentFilters;
    this.filterState.next(updatedFilters);
  }

  // Method to clear all filters
  clearFilters(): void {
    this.filterState.next({});
  }
}
