import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  it('should allow authenticated users', () => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: Router,
          useValue: {
            createUrlTree: () => '/login',
          },
        },
      ],
    });

    const authService = TestBed.inject(AuthService);
    authService.signIn();

    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as never, { url: '/lab' } as never),
    );

    expect(result).toBeTrue();
  });
});
