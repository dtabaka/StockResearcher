import { Component, Input } from '@angular/core';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { AppStateService } from '../services/appstate.service';

@Component({
  selector: 'app-pie-chart',
  imports: [NgxChartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {

  view: [number, number] = [350, 350]; // Width & height

  // Pie chart data
  @Input() pieChartData: { name: string; value: number }[] = [];
  @Input() pieChartKey: string = '';  

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

  constructor(private appStateService: AppStateService) {}
  
  onSliceClick(event: any): void {
    this.appStateService.setFilter(this.pieChartKey, event.name); //rating, "dividend"
  }
}
