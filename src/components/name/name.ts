import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-name',
  imports: [],
  template: `<p>name works!</p>`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Name { }
