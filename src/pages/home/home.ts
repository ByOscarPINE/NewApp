import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Name } from '../../components/name/name';

@Component({
  selector: 'app-home',
  imports: [Name],
  templateUrl: './home.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home { }
