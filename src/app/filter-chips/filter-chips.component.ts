import { Component, effect, inject } from '@angular/core';
import { MatChipSet, MatChip, MatChipsModule } from '@angular/material/chips';
import { MatIconModule, MatIcon } from "@angular/material/icon";
import { AppStateService } from '../services/appstate.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-filter-chips',
  imports: [MatIconModule, MatChipsModule, MatChipSet, MatChip, MatIcon, NgFor, NgIf],
  templateUrl: './filter-chips.component.html',
  styleUrl: './filter-chips.component.scss'
})
export class FilterChipsComponent {

  filters: { [key: string]: any } = {};

  objectKeys = Object.keys; // Directly reference Object.keys

  private appStateService = inject(AppStateService);

  constructor() {
    effect(() => {
      this.filters = this.appStateService.filterState();
    });
  }

  removeFilter(key: string) {
    this.appStateService.removeFilter(key);
  }

  clearFilters() {
    this.appStateService.clearFilters();
  }
}
