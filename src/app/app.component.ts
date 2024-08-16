import { TuiRoot } from '@taiga-ui/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header/header.component';

@Component({
  selector: 'tra-root',
  standalone: true,
  imports: [RouterOutlet, TuiRoot, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 't';
}
