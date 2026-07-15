import { Routes } from '@angular/router';
import { HomePage } from './route/home/home.page';

export const routes: Routes = [

    { path:'', redirectTo:'home', pathMatch: 'full'},
    { path: 'home', component: HomePage, title: 'Home'},

    {   path: 'about',
        loadComponent: () => import('./route/about/about.page').then((m) => m.AboutPage),
        title: 'About',
    },

    {   path: 'invitacion/:codigo',
        loadComponent: () => import('./route/invitacion/invitacion.page').then((m) => m.InvitacionPage),
        title: 'invitacion',
    },

    {   path: 'panel',
        loadComponent: () => import('./route/panel/panel.page').then((m) => m.PanelPage),
        title: 'Panel',
    },
    
    {   path: '**',
        loadComponent: () => import('./route/not-found/not-found.page').then((m) => m.NotFoundPage),
        title: 'Not found',
    },
];
