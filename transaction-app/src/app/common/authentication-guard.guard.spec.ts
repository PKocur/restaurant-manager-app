import { TestBed } from '@angular/core/testing';

import { AuthorizationGuard } from './authorization-guard.service';

describe('AuthenticationGuardGuard', () => {
  let guard: AuthorizationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorizationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
