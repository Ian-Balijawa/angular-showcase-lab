import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';

import { HttpDemoResponse } from '../models/demo.models';

export const demoHttpInterceptor = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const requestId = crypto.randomUUID();

  const enrichedRequest = request.clone({
    setHeaders: {
      'X-Demo-Request-Id': requestId,
      'X-Client': 'angular-showcase-lab',
    },
  });

  return next(enrichedRequest).pipe(
    catchError((error: unknown) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === 404 &&
        request.url.includes('/api/showcase')
      ) {
        const fallback: HttpDemoResponse = {
          source: 'demo interceptor',
          requestId,
          message:
            'The fake endpoint does not exist, so the interceptor converted the 404 into a typed demo response.',
          receivedAt: new Date().toISOString(),
        };

        return of(
          new HttpResponse<HttpDemoResponse>({
            status: 200,
            body: fallback,
          }),
        );
      }

      return throwError(() => error);
    }),
  );
};
