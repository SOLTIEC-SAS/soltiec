import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Nosotros } from './pages/nosotros/nosotros';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'Inicio', component: Home },
    { path: 'Nosotros', component: Nosotros },
];
