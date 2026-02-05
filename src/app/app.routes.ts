import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Nosotros } from './pages/nosotros/nosotros';
import { Tecnologia } from './pages/tecnologia/tecnologia';

import { Energia } from './pages/energia/energia';
import { Proyectos } from './pages/proyectos/proyectos';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'inicio', component: Home },
    { path: 'nosotros', component: Nosotros },
    { path: 'tecnologia', component: Tecnologia },

    { path: 'energia', component: Energia },
    { path: 'proyectos', component: Proyectos },
];
