(window as any).process = {
  env: {
    SUPABASE_URL: 'https://tmvgmxbqncxejzmdkhli.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtdmdteGJxbmN4ZWp6bWRraGxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MzYxMjgsImV4cCI6MjA4OTQxMjEyOH0.zL2QkqVNj1cqaatWtoGuGooCChaiTmGGGJLzvC-JKW0'
  }
};

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
