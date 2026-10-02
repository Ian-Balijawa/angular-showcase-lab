import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DeferredInsightsComponent } from './deferred-insights.component';

@Component({
  selector: 'asl-deferred-page',
  standalone: true,
  imports: [RouterLink, DeferredInsightsComponent],
  template: `
    <section class="container page-content">
      <p class="eyebrow">Performance lab</p>
      <h1 class="page-heading">Defer what the user doesn't need yet.</h1>
      <p class="page-subtitle">
        The analytics widget below is standalone and only becomes part of the
        page after the viewport reaches it.
      </p>

      <div class="spacer card">
        <span class="badge">Critical content</span>
        <h2>This section renders immediately.</h2>
        <p class="muted">
          Above-the-fold UI should remain lean. Heavy or non-critical components
          can be deferred to reduce the initial bundle.
        </p>
      </div>

      @defer (on viewport) {
        <asl-deferred-insights />
      } @placeholder {
        <div class="deferred-placeholder card">
          <span class="spinner" aria-hidden="true"></span>
          <div>
            <strong>Deferred analytics waiting for the viewport</strong>
            <p>Scroll down to trigger the chunk.</p>
          </div>
        </div>
      } @loading (minimum 250ms) {
        <div class="deferred-placeholder card">
          Loading analytics chunk…
        </div>
      } @error {
        <div class="deferred-placeholder card">
          The deferred widget could not be loaded.
        </div>
      }

      <a class="back-link" routerLink="/">← Return to showcase</a>
    </section>
  `,
  styles: [`
    .page-content {
      padding-top: 70px;
    }

    .spacer {
      min-height: 420px;
      margin-top: 34px;
      padding: 28px;
      background:
        radial-gradient(circle at 80% 20%, rgba(139,114,255,.12), transparent 20rem),
        var(--surface);
    }

    .spacer h2 {
      margin-top: 180px;
      font-size: 2rem;
      letter-spacing: -.04em;
    }

    .spacer p {
      max-width: 580px;
      line-height: 1.7;
    }

    .deferred-placeholder {
      display: flex;
      min-height: 220px;
      align-items: center;
      justify-content: center;
      gap: 15px;
      margin-top: 14px;
      color: var(--muted);
    }

    .deferred-placeholder strong {
      color: var(--text);
    }

    .deferred-placeholder p {
      margin: 4px 0 0;
      font-size: .78rem;
    }

    .spinner {
      width: 26px;
      height: 26px;
      border: 2px solid var(--border);
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 800ms linear infinite;
    }

    .back-link {
      display: inline-block;
      margin-top: 22px;
      color: var(--muted);
      font-size: .82rem;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeferredPageComponent { }
