import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate,redirectUnauthorizedTo} from '@angular/fire/auth-guard';

//Components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PerfilComponent } from './components/perfil/perfil.component';


const routes: Routes = [


  { path: '',           redirectTo: '/login',      pathMatch: 'full' },
  { path: 'login',      component :  LoginComponent                  },
  { path: 'register',   component :  RegisterComponent               },
  { path: 'perfil',     component :  PerfilComponent                 },
  { path: 'home',       redirectTo: '/home',       pathMatch: 'full' },
  { path: 'asistencia', redirectTo: '/asistencia', pathMatch: 'full' },
  { path: 'about',      redirectTo: '/about',      pathMatch: 'full' },
  { path: 'qrgen',      redirectTo: '/qrgen',      pathMatch: 'full' },
  { path: 'qrscan',     redirectTo: '/qrscan',     pathMatch: 'full' },
  { path: 'coversor',   redirectTo: '/coversor',   pathMatch: 'full' },
  { path: 'weather',    redirectTo: '/weather',  pathMatch: 'full' },
  { path: '**',         redirectTo: '/e404',       pathMatch: 'full' },

 
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./pages/asistencia/asistencia.module').then( m => m.AsistenciaPageModule),
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule),
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'qrgen',
    loadChildren: () => import('./pages/qrgen/qrgen.module').then( m => m.QrgenPageModule),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
    
    
  },
/*   {
    path: 'qrscan',
    loadChildren: () => import('./pages/qrscan/qrscan.module').then( m => m.QrscanPageModule),
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  }, */
  {
    path: 'e404',
    loadChildren: () => import('./pages/e404/e404.module').then( m => m.E404PageModule)
  },
  {
    path: 'coversor',
    loadChildren: () => import('./pages/coversor/coversor.module').then( m => m.CoversorPageModule),
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'weather',
    loadChildren: () => import('./pages/weather/weather.module').then( m => m.WeatherPageModule),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
