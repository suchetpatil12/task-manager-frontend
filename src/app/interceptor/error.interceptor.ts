import {

  HttpErrorResponse,
  HttpInterceptorFn

} from '@angular/common/http';

import { inject } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (

  req,
  next

) => {

  const snackBar = inject(MatSnackBar);

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      // =========================================
      // DEFAULT MESSAGE
      // =========================================

         let message =
  error.error?.error ||
  error.error?.message ||
  'Something went wrong';

message = `⚠️ ${message}`;

      // =========================================
      // BACKEND ERROR MESSAGE
      // =========================================

      if (

        error.error &&
        error.error.message

      ) {

        message = error.error.message;

      }

      // =========================================
      // SHOW SNACKBAR
      // =========================================

      snackBar.open(

        message,

        'Close',

        {

          duration: 4000,

          horizontalPosition: 'right',

          verticalPosition: 'top',

          panelClass: ['error-snackbar']

        }

      );

      return throwError(() => error);

    })

  );
};