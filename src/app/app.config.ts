import {

  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection

} from '@angular/core';

import {

  provideRouter

} from '@angular/router';

import {

  provideClientHydration,
  withEventReplay

} from '@angular/platform-browser';

import {

  provideAnimations

} from '@angular/platform-browser/animations';

import {

  provideHttpClient,
  withInterceptors

} from '@angular/common/http';

import {

  MatSnackBarModule

} from '@angular/material/snack-bar';

import { routes } from './app.routes';
import { authInterceptor } from './shared/auth.interceptor';



export const appConfig:
ApplicationConfig = {

  providers: [

    provideZoneChangeDetection({

      eventCoalescing: true

    }),

    provideRouter(routes),

    provideClientHydration(

      withEventReplay()

    ),

    provideAnimations(),

    provideHttpClient(

      withInterceptors([
        authInterceptor
      ])

    ),

    importProvidersFrom(
      MatSnackBarModule
    )

  ]

};