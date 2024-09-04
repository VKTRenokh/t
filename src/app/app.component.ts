import { TuiRoot } from '@taiga-ui/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { SearchPageComponent } from './search/components/search-page/search-page.component';

@Component({
  selector: 'tra-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TuiRoot,
    HeaderComponent,
    SearchPageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
