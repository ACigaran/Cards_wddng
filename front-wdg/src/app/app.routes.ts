import { Routes } from '@angular/router';
import { HomePage } from './route/home/home.page';

export const routes: Routes = [

    { path:'', redirectTo:'home', pathMatch: 'full'},
    { path: 'home', component: HomePage, title: 'Home'},

    {   path: 'about',
        loadComponent: () => import('./route/about/about.page').then((m) => m.AboutPage),
        title: 'About',
    },
    
    {   path: '**',
        loadComponent: () => import('./route/not-found/not-found.page').then((m) => m.NotFoundPage),
        title: 'Not found',
    },
];
