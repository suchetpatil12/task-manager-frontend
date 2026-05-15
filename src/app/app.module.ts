import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { authInterceptor } from "./shared/auth.interceptor";

providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: authInterceptor,
    multi: true
  }
]