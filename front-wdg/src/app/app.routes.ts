import { Routes } from '@angular/router';
import { HomePage } from './route/home/home.page';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

    {   path: 'invitacion/:codigo',
        loadComponent: () => import('./route/invitacion/invitacion.page').then((m) => m.InvitacionPage),
        title: 'invitacion',
    },

    {   path: 'dashboard',
        loadComponent: () => import('./route/dashboard/dashboard.page').then((m) => m.DashboardPage),
        canActivate: [
            authGuard
        ],
        title: 'dashboard',
    },

    {   path: 'login',
        loadComponent: () => import('./route/login/login.page').then((m) => m.LoginPage),
        title: 'login',
    },

    {   path: '**',
        loadComponent: () => import('./route/not-found/not-found.page').then((m) => m.NotFoundPage),
        title: 'Not found',
    },
];
