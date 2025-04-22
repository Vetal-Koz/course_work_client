import {APP_INITIALIZER, ApplicationConfig, inject, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {UpdateComponentRegisterService} from "./services/update-component-register.service";
import {getPendingRegistrations} from "./decorators/register-update-component-decorator";
import {CreateComponentRegisterService} from "./services/create-component-register";
import {getPendingCreateRegistrations} from "./decorators/register-create-component-decorator";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const updateRegisterService = inject(UpdateComponentRegisterService);
        const createRegisterService = inject(CreateComponentRegisterService);
        const updateRegistrations = getPendingRegistrations();
        const createRegistrations = getPendingCreateRegistrations();

        return () => {
          // Register update components
          updateRegistrations.forEach(({ key, component }) => {
            updateRegisterService.register(key, component);
          });

          // Register create components
          createRegistrations.forEach(({ key, component }) => {
            createRegisterService.register(key, component);
          });
        };
      },
      multi: true,
    },
  ],
};
