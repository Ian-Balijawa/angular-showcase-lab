import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { HttpDemoResponse } from '../../core/models/demo.models';
import { HttpDemoService } from '../../core/services/http-demo.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'asl-http-page',
  standalone: true,
  imports: [RouterLink, JsonPipe],
  template: `
    <section class="container page-content">
      <p class="eyebrow">HttpClient + Interceptor</p>
      <h1 class="page-heading">Networking without a backend.</h1>
      <p class="page-subtitle">
        Click the button to request a fake endpoint. The interceptor adds
        request metadata and turns the expected 404 into a typed demo response.
      </p>

      <div class="http-layout">
        <article class="card request-card">
          <div class="request-line">
            <span class="method">GET</span>
            <code>/api/showcase</code>
          </div>

          <div class="steps">
            <div><span>01</span><strong>HttpClient</strong><small>Creates the typed request.</small></div>
            <div><span>02</span><strong>Interceptor</strong><small>Adds X-Demo-Request-Id.</small></div>
            <div><span>03</span><strong>Error handling</strong><small>Maps 404 → demo response.</small></div>
          </div>

          <button class="btn btn-primary" type="button" [disabled]="loading()" (click)="runDemo()">
            {{ loading() ? 'Calling...' : 'Run interceptor demo' }}
          </button>
        </article>

        <article class="card response-card">
          <p class="eyebrow">Response</p>

          @if (response(); as result) {
            <div class="response">
              <div class="status">200 · handled</div>
              <pre>{{ result | json }}</pre>
            </div>
          } @else {
            <div class="empty">
              <span aria-hidden="true">⇄</span>
              <p>No request yet.</p>
              <small>The interceptor is waiting for traffic.</small>
            </div>
          }

          @if (errorMessage()) {
            <div class="error-box" role="alert">{{ errorMessage() }}</div>
          }
        </article>
      </div>

      <a class="back-link" routerLink="/">← Return to showcase</a>
    </section>
  `,
  styles: [`
    .page-content {
      padding-top: 70px;
    }

    .http-layout {
      display: grid;
      grid-template-columns: .85fr 1.15fr;
      gap: 14px;
      margin-top: 32px;
    }

    .request-card,
    .response-card {
      min-height: 400px;
      padding: 25px;
    }

    .request-line {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px;
      border: 1px solid var(--border);
      border-radius: 12px;
      background: rgba(0,0,0,.18);
    }

    .method {
      padding: 4px 7px;
      border-radius: 6px;
      color: #9af1de;
      background: rgba(31,212,174,.1);
      font-size: .65rem;
      font-weight: 900;
    }

    .steps {
      display: grid;
      gap: 11px;
      margin: 28px 0;
    }

    .steps > div {
      display: grid;
      grid-template-columns: 32px 1fr;
      column-gap: 9px;
      padding: 10px;
      border: 1px solid var(--border);
      border-radius: 11px;
    }

    .steps span {
      grid-row: 1 / 3;
      color: var(--primary);
      font-size: .72rem;
      font-weight: 900;
    }

    .steps strong {
      font-size: .82rem;
    }

    .steps small {
      color: var(--muted);
      font-size: .72rem;
    }

    .response {
      min-height: 300px;
    }

    .status {
      display: inline-block;
      padding: 5px 8px;
      border-radius: 7px;
      color: #9af1de;
      background: rgba(31,212,174,.1);
      font-size: .68rem;
      font-weight: 800;
    }

    pre {
      margin-top: 14px;
      padding: 16px;
      border: 1px solid var(--border);
      border-radius: 12px;
      color: #cfc9ff;
      background: #0b0e16;
      overflow: auto;
      font-size: .72rem;
      line-height: 1.6;
    }

    .empty {
      display: grid;
      min-height: 300px;
      place-content: center;
      color: var(--muted);
      text-align: center;
    }

    .empty span {
      color: var(--primary);
      font-size: 3rem;
    }

    .error-box {
      margin-top: 12px;
      padding: 12px;
      border-radius: 10px;
      color: #ffb3ba;
      background: rgba(255,107,122,.08);
      font-size: .76rem;
    }

    .back-link {
      display: inline-block;
      margin-top: 22px;
      color: var(--muted);
      font-size: .82rem;
    }

    @media (max-width: 760px) {
      .http-layout {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HttpPageComponent {
  private readonly httpDemoService = inject(HttpDemoService);

  protected readonly loading = signal(false);
  protected readonly response = signal<HttpDemoResponse | null>(null);
  protected readonly errorMessage = signal<string | null>(null);

  protected runDemo(): void {
    this.loading.set(true);
    this.response.set(null);
    this.errorMessage.set(null);

    this.httpDemoService.loadDemo().subscribe({
      next: (result) => {
        this.response.set(result);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        const message =
          error instanceof HttpErrorResponse
            ? `HTTP ${error.status}: ${error.message}`
            : 'Unexpected request failure.';

        this.errorMessage.set(message);
        this.loading.set(false);
      },
    });
  }
}
