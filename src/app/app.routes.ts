import { Routes } from '@angular/router';
import { Login } from '../pages/login/login';
import { Home } from '../pages/home/home';
import { authGuard } from '../guards/auth-guard';
import { activeUserGuard } from '../guards/active-user-guard';

export const routes: Routes = [
    {
        path: 'login',
        component: Login,
        canActivate: [activeUserGuard]
    },
    {
        path: 'home',
        component: Home,
        canActivate: [authGuard]
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'home'
    }
];
