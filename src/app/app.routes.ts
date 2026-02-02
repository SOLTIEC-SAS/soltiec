import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Nosotros } from './pages/nosotros/nosotros';

import { Proyectos } from './pages/proyectos/proyectos';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'inicio', component: Home },
    { path: 'nosotros', component: Nosotros },

     { path: 'proyectos', component: Proyectos },
];
