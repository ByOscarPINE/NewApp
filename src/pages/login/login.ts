import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginForm } from '../../components/LoginForm/LoginForm';

@Component({
  selector: 'app-login',
  imports: [LoginForm],
  templateUrl: './login.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login { }
