import {

  HttpInterceptorFn

} from '@angular/common/http';

export const authInterceptor:
HttpInterceptorFn = (req, next) => {

  const token =
    localStorage.getItem('token');

  // Skip auth endpoints
  if (

    req.url.includes('/auth/login') ||

    req.url.includes('/auth/register')

  ) {

    return next(req);

  }

  // Add JWT token
  if (token) {

    req = req.clone({

      setHeaders: {

        Authorization:
          `Bearer ${token}`

      }

    });

  }

  return next(req);

};