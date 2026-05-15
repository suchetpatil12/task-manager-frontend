import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';



import { LoaderComponent } from './components/loader/loader.component';

import { LoadingService } from './services/loading.service';
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    LoaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public loadingService: LoadingService
  ) {}

}