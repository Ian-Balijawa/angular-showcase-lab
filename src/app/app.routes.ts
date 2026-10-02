import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { featureGuard } from './core/guards/feature.guard';
import { labResolver } from './core/resolvers/lab.resolver';
import { unsavedChangesGuard } from './core/guards/unsaved-changes.guard';

export const appRoutes: Routes = [
  {
    path: '',
    title: 'Angular Showcase Lab',
    loadComponent: () =>
      import('./features/home/home-page.component').then(
        ({ HomePageComponent }) => HomePageComponent,
      ),
  },
  {
    path: 'lab',
    title: 'Feature Lab · Angular Showcase',
    canActivate: [authGuard],
    canMatch: [featureGuard],
    resolve: {
      lab: labResolver,
    },
    loadComponent: () =>
      import('./features/lab/lab-page.component').then(
        ({ LabPageComponent }) => LabPageComponent,
      ),
  },
  {
    path: 'forms',
    title: 'Reactive Forms · Angular Showcase',
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard],
    loadComponent: () =>
      import('./features/forms/forms-page.component').then(
        ({ FormsPageComponent }) => FormsPageComponent,
      ),
  },
  {
    path: 'http',
    title: 'HTTP & Interceptor Lab · Angular Showcase',
    loadComponent: () =>
      import('./features/http/http-page.component').then(
        ({ HttpPageComponent }) => HttpPageComponent,
      ),
  },
  {
    path: 'deferred',
    title: 'Deferred UI · Angular Showcase',
    loadComponent: () =>
      import('./features/deferred/deferred-page.component').then(
        ({ DeferredPageComponent }) => DeferredPageComponent,
      ),
  },
  {
    path: 'login',
    title: 'Sign in · Angular Showcase',
    loadComponent: () =>
      import('./features/login/login-page.component').then(
        ({ LoginPageComponent }) => LoginPageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
