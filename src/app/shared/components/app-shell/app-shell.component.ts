import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'asl-app-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="topbar">
      <a class="brand" routerLink="/" aria-label="Angular Showcase Lab home">
        <span class="brand-mark">A</span>
        <span>
          <strong>Angular</strong>
          <small>Showcase Lab</small>
        </span>
      </a>

      <nav class="nav" aria-label="Primary navigation">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
        <a routerLink="/lab" routerLinkActive="active">Feature Lab</a>
        <a routerLink="/forms" routerLinkActive="active">Forms</a>
        <a routerLink="/http" routerLinkActive="active">HTTP</a>
        <a routerLink="/deferred" routerLinkActive="active">Deferred</a>
      </nav>

      <span class="auth-pill" [class.authenticated]="isAuthenticated()">
        <span class="dot"></span>
        {{ isAuthenticated() ? 'Demo session active' : 'Guest mode' }}
      </span>
    </header>

    <main>
      <ng-content />
    </main>

    <footer class="footer">
      <div class="container footer-inner">
        <span>Angular Showcase Lab</span>
        <span>Built with standalone Angular + signals + SCSS</span>
      </div>
    </footer>
  `,
  styles: [`
    .topbar {
      position: sticky;
      top: 0;
      z-index: 20;
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 30px;
      align-items: center;
      min-height: 72px;
      padding: 0 24px;
      border-bottom: 1px solid var(--border);
      background: rgba(8, 11, 18, 0.82);
      backdrop-filter: blur(18px);
    }

    .brand {
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }

    .brand-mark {
      display: grid;
      width: 38px;
      height: 38px;
      place-items: center;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      color: white;
      font-weight: 950;
    }

    .brand strong,
    .brand small {
      display: block;
    }

    .brand small {
      margin-top: 2px;
      color: var(--muted);
      font-size: 0.68rem;
    }

    .nav {
      display: flex;
      justify-content: center;
      gap: 4px;
    }

    .nav a {
      padding: 9px 11px;
      border-radius: 10px;
      color: var(--muted);
      font-size: 0.86rem;
      font-weight: 700;
    }

    .nav a:hover,
    .nav a.active {
      color: var(--text);
      background: var(--surface-2);
    }

    .auth-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 7px 10px;
      border: 1px solid var(--border);
      border-radius: 999px;
      color: var(--muted);
      font-size: 0.72rem;
      white-space: nowrap;
    }

    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--muted);
    }

    .auth-pill.authenticated {
      color: #bff8e9;
      border-color: rgba(31, 212, 174, 0.22);
    }

    .auth-pill.authenticated .dot {
      background: var(--accent);
      box-shadow: 0 0 10px rgba(31, 212, 174, 0.7);
    }

    .footer {
      margin-top: 70px;
      border-top: 1px solid var(--border);
      color: var(--muted);
      font-size: 0.76rem;
    }

    .footer-inner {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      padding-block: 22px;
    }

    @media (max-width: 900px) {
      .topbar {
        grid-template-columns: auto auto;
      }

      .nav {
        grid-column: 1 / -1;
        grid-row: 2;
        justify-content: flex-start;
        overflow-x: auto;
        padding-bottom: 10px;
      }

      .auth-pill {
        justify-self: end;
      }
    }

    @media (max-width: 600px) {
      .topbar {
        padding-inline: 12px;
      }

      .footer-inner {
        flex-direction: column;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {
  readonly isAuthenticated = input(false);
}
