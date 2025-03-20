// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-querybuiler',
//   imports: [],
//   templateUrl: './querybuiler.component.html',
//   styleUrl: './querybuiler.component.scss'
// })
// export class QuerybuilerComponent {

// }

import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, FormArray } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

@Component({
  selector: 'app-querybuilder',
  standalone: true,
  imports: [
    ReactiveFormsModule,  // Import ReactiveFormsModule
    MatFormFieldModule,   // Import Angular Material Form Field
    MatSelectModule,      // Import Angular Material Select
    MatButtonModule,       // Import Angular Material Button
    CommonModule,          // Import CommonModule to use ngFor

  ],
  templateUrl: './querybuilder.component.html',
  styleUrls: ['./querybuilder.component.scss'],
})
export class QueryBuilderComponent {
  form: FormGroup;
  dropdownOptions = ['Option 1', 'Option 2', 'Option 3'];

  // Sample data with id and display value for dropdowns
  // contexts = [
  //   { id: 'event1', display: 'Event 1' },
  //   { id: 'event2', display: 'Event 2' },
  //   { id: 'event3', display: 'Event 3' }
  // ];
  contexts: any[] = [];

  filterTypes = [
    { id: 'type1', display: 'Type 1' },
    { id: 'type2', display: 'Type 2' },
    { id: 'type3', display: 'Type 3' }
  ];

  filters = [
    { id: 'filter1', display: 'Filter 1' },
    { id: 'filter2', display: 'Filter 2' },
    { id: 'filter3', display: 'Filter 3' }
  ];

  uniqueContexts: string[] = [];

  private http = inject(HttpClient);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      context: [''],  // Initialize the 'context' form control
      filters: this.fb.array([])  // Initialize the 'filters' FormArray
    });
  }

  ngOnInit() {

    debugger
    this.http.get<any[]>('api/contexts').subscribe(
      (contexts) => {
        debugger
        this.contexts = contexts;
        this.uniqueContexts = Array.from(new Set(contexts.map(context => context.context)));
        debugger
      },
      (error) => {
        console.error('Error fetching contexts:', error);
      }
    );
  

  }

  // Getter for the 'filters' FormArray
  get filtersArray(): FormArray {
    return this.form.get('filters') as FormArray;
  }

  onContextChange(selectedContext: string) {
    debugger
    console.log('Selected context:', selectedContext);
  
    // Example logic
    if (selectedContext === 'event1') {
      console.log('Event 1 selected — Load specific data');
    } else if (selectedContext === 'event2') {
      console.log('Event 2 selected — Load different data');
    }
  }
  

  // Method to add a new filter row
  addFilter() {
    debugger
    this.filtersArray.push(
      this.fb.group({
        filterType: [''],   // Control for 'FilterType' dropdown
        filter: ['']        // Control for 'Filters' dropdown
      })
    );
  }

  // Method to remove a filter row
  removeFilter(index: number) {
    this.filtersArray.removeAt(index);
  }

  onSubmit() {
    console.log(this.form.value);  // Handle form submission
  }
}