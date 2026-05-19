import { bootstrapApplication } from '@angular/platform-browser';

import { provideRouter } from '@angular/router';

import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import {
  provideAnimations
} from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';

import { routes } from './app/app.routes';

import { authInterceptor }
from './app/interceptor/auth.interceptor';

import { errorInterceptor }
from './app/interceptor/error.interceptor';

bootstrapApplication(AppComponent, {

  providers: [

    provideRouter(routes),

    provideAnimations(),

    provideHttpClient(

      withInterceptors([

        authInterceptor,

        errorInterceptor

      ])

    )

  ]

})

.catch(err => console.error(err));