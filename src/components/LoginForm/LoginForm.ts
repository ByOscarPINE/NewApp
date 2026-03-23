import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-cyan-100/50">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h2>
        <p class="mt-2 text-sm text-gray-500 italic">Please enter your credentials to access your account</p>
      </div>

      @if (errorMessage()) {
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200 animate-pulse">
          <span class="font-bold">Error:</span> {{ errorMessage() }}
        </div>
      }
      
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-4">
        <div>
          <label for="email" class="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
          <input 
            type="email" 
            id="email" 
            formControlName="email"
            class="block w-full px-4 py-3 text-gray-900 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white"
            placeholder="you@example.com"
            [class.border-red-500]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
            [class.bg-red-50]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
          >
          @if (loginForm.get('email')?.invalid && loginForm.get('email')?.touched) {
            <div class="mt-1 text-xs text-red-500 font-medium">
              @if (loginForm.get('email')?.errors?.['required']) {
                <span>Email is required.</span>
              }
              @if (loginForm.get('email')?.errors?.['email']) {
                <span>Please enter a valid email address.</span>
              }
            </div>
          }
        </div>

        <div>
          <label for="password" class="block text-sm font-semibold text-gray-700 mb-1">Password</label>
          <input 
            type="password" 
            id="password" 
            formControlName="password"
            class="block w-full px-4 py-3 text-gray-900 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white"
            placeholder="••••••••"
            [class.border-red-500]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
            [class.bg-red-50]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
          >
          @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
            <div class="mt-1 text-xs text-red-500 font-medium">
              @if (loginForm.get('password')?.errors?.['required']) {
                <span>Password is required.</span>
              }
            </div>
          }
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
          [disabled]="loginForm.invalid || isLoading()"
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          @if (isLoading()) {
            <span class="animate-spin mr-2">⏳</span> Processing...
          } @else {
            Sign In
          }
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
  private auth_service = inject(Auth);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      await this.auth_service.login(this.loginForm.value as { email: string, password: string });
      console.log('Login successful!');
    } catch (error: any) {
      console.error('Login error:', error);
      this.errorMessage.set(error.message || 'An unexpected error occurred. Please check your credentials.');
    } finally {
      this.isLoading.set(false);
    }
  }
}

