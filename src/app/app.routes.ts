import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./list-super-heros/list-super-heros.component').then(com => com.ListSuperHerosComponent) }
];
