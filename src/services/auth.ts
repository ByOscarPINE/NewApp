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
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
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
