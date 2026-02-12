import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Nosotros } from './pages/nosotros/nosotros';
import { Tecnologia } from './pages/tecnologia/tecnologia';
import { Ingenieria } from './pages/ingenieria/ingenieria';
import { Energia } from './pages/energia/energia';
import { Construccion } from './pages/construccion/construccion';
import { Proyectos } from './pages/proyectos/proyectos';
import { Contacto } from './pages/contacto/contacto';
import { Calculadora } from './pages/calculadora/calculadora';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'inicio', component: Home },
    { path: 'nosotros', component: Nosotros },
    { path: 'tecnologia', component: Tecnologia },
    { path: 'ingenieria', component: Ingenieria },
    { path: 'energia', component: Energia },
    { path: 'construccion', component: Construccion },
    { path: 'proyectos', component: Proyectos },
    { path: 'contacto', component: Contacto },
    { path: 'calculadora', component: Calculadora },
];
