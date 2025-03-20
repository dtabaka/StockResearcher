import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QueryBuilderComponent } from "./querybuilder/querybuilder.component";
import { provideHttpClient, withFetch } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, QueryBuilderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'querybuilder';
}
