import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, NgOptimizedImage } from '@angular/common';

import { ActivityService } from '../../core/services/activity.service';
import { AuthService } from '../../core/services/auth.service';
import { CompactNumberPipe } from '../../shared/pipes/compact-number.pipe';
import { StatTileComponent } from '../../shared/components/stat-tile/stat-tile.component';

@Component({
  selector: 'asl-lab-page',
  standalone: true,
  imports: [RouterLink, DatePipe, NgOptimizedImage, CompactNumberPipe, StatTileComponent],
  template: `
    <section class="container lab">
      <div class="lab-header">
        <div>
          <p class="eyebrow">Protected route · resolver data</p>
          <h1 class="page-heading">{{ routeData().title }}</h1>
          <p class="page-subtitle">{{ routeData().description }}</p>
        </div>

        <button class="btn btn-danger" type="button" (click)="signOut()">
          Sign out
        </button>
      </div>

      <div class="stats">
        <asl-stat-tile icon="◈" label="Signal count" [value]="count() | compactNumber" />
        <asl-stat-tile icon="↗" label="Computed value" [value]="doubleCount().toString()" />
        <asl-stat-tile icon="◎" label="Resolver" value="Ready" />
        <asl-stat-tile icon="✓" label="Guard" value="Active" />
      </div>

      <div class="demo-grid">
        <article class="card signal-card">
          <p class="eyebrow">Signals + computed</p>
          <h2>A tiny reactive state machine</h2>
          <p class="muted">
            The values below are signals. The derived value is a computed signal,
            so the UI updates without manually subscribing to anything.
          </p>

          <div class="counter">
            <button class="btn" type="button" (click)="decrement()">−</button>
            <strong>{{ count() }}</strong>
            <button class="btn btn-primary" type="button" (click)="increment()">+</button>
          </div>

          <div class="code-note">
            <code>doubleCount = computed(() =&gt; count() * 2)</code>
          </div>
        </article>

        <article class="card image-card">
          <img
            ngSrc="assets/showcase.svg"
            width="720"
            height="440"
            priority
            alt="Abstract Angular architecture illustration"
          />
          <div>
            <p class="eyebrow">NgOptimizedImage</p>
            <h2>Stable, optimized imagery</h2>
            <p class="muted">
              This image uses Angular's optimized image directive with explicit
              dimensions and priority loading.
            </p>
          </div>
        </article>
      </div>

      <article class="card resolver-card">
        <div>
          <p class="eyebrow">Resolved before activation</p>
          <h2>Route data arrived first</h2>
          <p class="muted">
            Resolved at {{ routeData().resolvedAt | date:'medium' }}.
          </p>
        </div>
        <span class="badge">ResolveFn</span>
      </article>

      <a class="back-link" routerLink="/">← Return to showcase</a>
    </section>
  `,
  styles: [`
    .lab {
      padding-top: 70px;
    }

    .lab-header {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 30px;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-top: 35px;
    }

    .demo-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-top: 14px;
    }

    .signal-card,
    .image-card {
      min-height: 360px;
      padding: 25px;
    }

    h2 {
      margin: 0;
      font-size: 1.4rem;
      letter-spacing: -.03em;
    }

    .signal-card > .muted {
      max-width: 600px;
      line-height: 1.7;
    }

    .counter {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-top: 55px;
    }

    .counter strong {
      min-width: 80px;
      text-align: center;
      font-size: 3.5rem;
      letter-spacing: -.06em;
    }

    .code-note {
      margin-top: 40px;
      padding: 14px;
      border: 1px solid var(--border);
      border-radius: 12px;
      color: #c9c0ff;
      background: rgba(0,0,0,.18);
      overflow: auto;
    }

    .image-card {
      display: grid;
      grid-template-rows: 180px auto;
      gap: 22px;
    }

    .image-card img {
      width: 100%;
      height: 180px;
      border-radius: 14px;
      object-fit: cover;
    }

    .image-card p {
      line-height: 1.7;
    }

    .resolver-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      margin-top: 14px;
      padding: 24px;
    }

    .resolver-card h2 {
      margin-top: 3px;
    }

    .back-link {
      display: inline-block;
      margin-top: 25px;
      color: var(--muted);
      font-size: .82rem;
    }

    @media (max-width: 800px) {
      .lab-header {
        align-items: flex-start;
        flex-direction: column;
      }

      .stats,
      .demo-grid {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 560px) {
      .stats,
      .demo-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly activityService = inject(ActivityService);

  protected readonly count = signal(7);
  readonly doubleCount = computed(() => this.count() * 2);

  protected readonly routeData = computed(() => {
    return this.route.snapshot.data['lab'] as {
      title: string;
      description: string;
      resolvedAt: string;
    };
  });

  protected increment(): void {
    this.count.update((value) => value + 1);
    this.activityService.addActivity({
      title: 'Signal incremented',
      detail: `Counter is now ${this.count()}.`,
      timestamp: 'just now',
      type: 'service',
    });
  }

  protected decrement(): void {
    this.count.update((value) => value - 1);
  }

  protected signOut(): void {
    this.authService.signOut();
    window.location.assign('/');
  }
}
