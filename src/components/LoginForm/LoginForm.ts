import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-cyan-100/50">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h2>
        <p class="mt-2 text-sm text-gray-500 italic">Please enter your credentials to access your account</p>
      </div>
      
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-4">
        <div>
          <label for="email" class="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
          <input 
            type="email" 
            id="email" 
            formControlName="email"
            class="block w-full px-4 py-3 text-gray-900 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white"
            placeholder="you@example.com"
            [ngClass]="{'border-red-500 bg-red-50': loginForm.get('email')?.invalid && loginForm.get('email')?.touched}"
          >
          <div *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched" class="mt-1 text-xs text-red-500 font-medium">
            <span *ngIf="loginForm.get('email')?.errors?.['required']">Email is required.</span>
            <span *ngIf="loginForm.get('email')?.errors?.['email']">Please enter a valid email address.</span>
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-semibold text-gray-700 mb-1">Password</label>
          <input 
            type="password" 
            id="password" 
            formControlName="password"
            class="block w-full px-4 py-3 text-gray-900 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white"
            placeholder="••••••••"
            [ngClass]="{'border-red-500 bg-red-50': loginForm.get('password')?.invalid && loginForm.get('password')?.touched}"
          >
          <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched" class="mt-1 text-xs text-red-500 font-medium">
            <span *ngIf="loginForm.get('password')?.errors?.['required']">Password is required.</span>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" type="checkbox" class="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded">
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
          </div>
          <div class="text-sm">
            <a href="#" class="font-medium text-cyan-600 hover:text-cyan-500 transition-colors">Forgot password?</a>
          </div>
        </div>

        <button 
          type="submit" 
          [disabled]="loginForm.invalid"
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Sign In
        </button>
      </form>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginForm {
  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);
    }
  }
}

