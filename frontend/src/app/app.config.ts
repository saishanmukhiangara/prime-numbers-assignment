import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

// Example: endpoints for each question
export const questionEndpoints = [
  ['/api/run-solution-1', '/api/run-solution-1-alt'],
  ['/api/run-solution-2'],
  ['/api/run-solution-3'],
  ['/api/run-solution-4'],
  ['/api/run-solution-5'],
  ['/api/run-solution-6'],
  ['/api/run-solution-7'],
  ['/api/run-solution-8']
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient()
  ]
};
