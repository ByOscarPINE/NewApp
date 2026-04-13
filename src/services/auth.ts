import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private router = inject(Router);
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = import.meta.env['NG_APP_SUPABASE_URL'] as string;
    const supabaseKey = import.meta.env['NG_APP_SUPABASE_ANON_KEY'] as string;
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async login(user: { email: string, password: string }) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });

    if (error) {
      throw error;
    }

    localStorage.setItem('user', JSON.stringify(data.user));
    this.router.navigate(['/home']);
    return data;
  }

  async getUser(){
    const { data, error } = await this.supabase.auth.getUser();
    if (error) {
      throw new Error( 'Error' + error.message);
    }
    return data.user;
  }

  async getProducts () {
    const { data: products, error } = await this.supabase
      .from('products')
      .select('*')
    if (error) {
      throw new Error( 'Error' + error.message);
    }
    return products;
  }
}
