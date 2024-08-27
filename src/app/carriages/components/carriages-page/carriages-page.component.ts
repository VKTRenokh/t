import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { CarriagesService } from '../../services/carriages.service';

@Component({
  selector: 'tra-carriages-page',
  standalone: true,
  imports: [TuiButton],
  templateUrl: './carriages-page.component.html',
  styleUrl: './carriages-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarriagesPageComponent implements OnInit {
  private service = inject(CarriagesService);

  public ngOnInit(): void {
    this.service.getCarriages().subscribe(carriages => {
      console.log(carriages);
    });
  }
}
