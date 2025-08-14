import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  // Internal writable signal
  private readonly _filterState = signal<{ [key: string]: any }>({});

  // Public read-only signal
  readonly filterState: Signal<{ [key: string]: any }> = this._filterState;

  /** Set or update a filter value */
  setFilter(key: string, value: any): void {
    this._filterState.update(currentFilter => ({
      ...currentFilter,
      [key]: value
    }));
  }

  /** Remove a filter by key */
  removeFilter(key: string): void {
    this._filterState.update(currentFilter => {
      const { [key]: _, ...updatedFilter } = currentFilter;
      return updatedFilter;
    });
  }

  /** Clear all filters */
  clearFilters(): void {
    this._filterState.set({});
  }
}