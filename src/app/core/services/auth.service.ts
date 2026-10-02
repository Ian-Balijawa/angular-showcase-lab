import { Injectable, computed, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'angular-showcase-auth';
  private readonly authenticatedState = signal<boolean>(
    localStorage.getItem(this.storageKey) === 'true',
  );

  readonly isAuthenticated = computed(() => this.authenticatedState());

  constructor() {
    effect(() => {
      if (this.authenticatedState()) {
        localStorage.setItem(this.storageKey, 'true');
      } else {
        localStorage.removeItem(this.storageKey);
      }
    });
  }

  signIn(): void {
    this.authenticatedState.set(true);
  }

  signOut(): void {
    this.authenticatedState.set(false);
  }
}
