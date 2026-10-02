import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'asl-login-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page login-page">
      <div class="login-card card">
        <div class="mark">A</div>
        <p class="eyebrow">Demo authentication</p>
        <h1>Unlock the Feature Lab</h1>
        <p>
          This app uses a small signal-backed auth service so the route guard
          can demonstrate redirects without needing a real identity provider.
        </p>

        <button class="btn btn-primary" type="button" (click)="signIn()">
          Sign in to demo
        </button>

        <a routerLink="/" class="back">← Back home</a>
      </div>
    </section>
  `,
  styles: [`
    .login-page {
      display: grid;
      min-height: calc(100vh - 72px);
      place-items: center;
      padding: 30px 20px;
    }

    .login-card {
      width: min(460px, 100%);
      padding: 36px;
      text-align: center;
    }

    .mark {
      display: grid;
      width: 60px;
      height: 60px;
      margin: 0 auto 22px;
      place-items: center;
      border-radius: 20px;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      font-size: 2rem;
      font-weight: 950;
    }

    h1 {
      margin: 0;
      font-size: 2rem;
      letter-spacing: -.04em;
    }

    p:not(.eyebrow) {
      margin: 14px 0 25px;
      color: var(--muted);
      line-height: 1.7;
    }

    .btn {
      width: 100%;
    }

    .back {
      display: block;
      margin-top: 18px;
      color: var(--muted);
      font-size: .8rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected signIn(): void {
    this.authService.signIn();

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/lab';
    void this.router.navigateByUrl(returnUrl);
  }
}
