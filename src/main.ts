import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { demoHttpInterceptor } from './app/core/interceptors/demo-http.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      }),
    ),
    provideHttpClient(withInterceptors([demoHttpInterceptor])),
  ],
}).catch((error: unknown) => {
  console.error('Angular bootstrap failed', error);
});
