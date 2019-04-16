import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuardService as AuthGuard } from '../app/providers/auth';
import { EventsComponent } from './views/events/events.component';

export const routes: Routes = [
  //OLD ROUTES
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full',
    canActivate: [AuthGuard] 
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
      canActivate: [AuthGuard] 
    },
    children: [
      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule',
        canActivate: [AuthGuard] 
      },
      {
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule',
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule',
        canActivate: [AuthGuard] 
      },
      {
        path: 'theme',
        loadChildren: './views/theme/theme.module#ThemeModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      },
      //NEW ROUTES
      {
        path: 'usuarios',
        loadChildren: './views/usuarios/usuarios.module#UsuariosModule',
        canActivate: [AuthGuard] 
      },
      {
        path: 'trilhas',
        loadChildren: './views/trilhas/trilhas.module#TrilhasModule',
        canActivate: [AuthGuard] 
      },
      {
        path: 'quiz',
        loadChildren: './views/quiz/quiz.module#QuizModule',
        canActivate: [AuthGuard] 
      },
      {
        path: 'notificacoes',
        loadChildren: './views/notificacoes/notificacoes.module#NotificacoesModule',
        canActivate: [AuthGuard] 
      },
      {
        path: 'posts',
        loadChildren: './views/posts/posts.module#PostsModule',
        canActivate: [AuthGuard] 
      },
      {
        path: 'cursos',
        loadChildren: './views/cursos/cursos.module#CursosModule',
        canActivate: [AuthGuard] 
      },
      {
        path: 'events',
        loadChildren: './views/events/events.module#EventsModule',
        canActivate: [AuthGuard] 
      },
      {
        path: 'aulas',
        loadChildren: './views/aulas/aulas.module#AulasModule',
        canActivate: [AuthGuard] 
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
