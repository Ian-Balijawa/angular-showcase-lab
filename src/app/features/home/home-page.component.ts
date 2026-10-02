import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { ActivityService } from '../../core/services/activity.service';
import { AuthService } from '../../core/services/auth.service';
import { FeatureCatalogService } from '../../core/services/feature-catalog.service';
import { CompactNumberPipe } from '../../shared/pipes/compact-number.pipe';
import { FeatureCardComponent } from '../../shared/components/feature-card/feature-card.component';
import { StatTileComponent } from '../../shared/components/stat-tile/stat-tile.component';

@Component({
  selector: 'asl-home-page',
  standalone: true,
  imports: [RouterLink, CompactNumberPipe, FeatureCardComponent, StatTileComponent],
  template: `
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">Angular, but make it a playground</p>
          <h1 class="page-heading">
            Learn Angular by <span>walking through a real app.</span>
          </h1>
          <p class="page-subtitle">
            Showcase Lab turns the framework's major building blocks into an
            interactive product: routing, guards, signals, services, forms,
            HTTP, pipes, directives and performance patterns.
          </p>

          <div class="actions">
            <a class="btn btn-primary" routerLink="/lab">
              Enter the protected lab
              <span aria-hidden="true">→</span>
            </a>
            <a class="btn" routerLink="/deferred">See performance demo</a>
          </div>

          <div class="hero-meta">
            <span><i></i> Standalone-first</span>
            <span><i></i> Signal-driven</span>
            <span><i></i> SCSS</span>
          </div>
        </div>

        <div class="orbit card" aria-label="Angular architecture visualization">
          <div class="orbit-ring ring-one"></div>
          <div class="orbit-ring ring-two"></div>
          <div class="orbit-core">
            <span>A</span>
            <small>Angular</small>
          </div>
          <div class="orbit-node node-one">UI</div>
          <div class="orbit-node node-two">DI</div>
          <div class="orbit-node node-three">RX</div>
          <div class="orbit-node node-four">ROUTER</div>
        </div>
      </div>
    </section>

    <section class="container stats-section" aria-label="Showcase metrics">
      <asl-stat-tile icon="◈" label="Features mapped" [value]="featureCount() | compactNumber" />
      <asl-stat-tile icon="↯" label="Routes demonstrated" value="7" />
      <asl-stat-tile icon="⚡" label="State source" value="Signals" />
      <asl-stat-tile icon="✓" label="Type safety" value="Strict" />
    </section>

    <section class="container catalog">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Feature map</p>
          <h2>What you can explore</h2>
        </div>

        <label class="search">
          <span aria-hidden="true">⌕</span>
          <span class="sr-only">Search Angular features</span>
          <input
            type="search"
            [value]="catalog.search()"
            (input)="catalog.setSearch($any($event.target).value)"
            placeholder="Search concepts..."
          />
        </label>
      </div>

      <div class="feature-grid">
        @for (feature of catalog.filteredFeatures(); track feature.id) {
          <asl-feature-card [feature]="feature" />
        } @empty {
          <div class="empty card">No features match that search.</div>
        }
      </div>
    </section>

    <section class="container activity-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Live state</p>
          <h2>Activity stream</h2>
        </div>
        <button class="btn" type="button" (click)="simulateActivity()">
          Simulate event
        </button>
      </div>

      <div class="activity card">
        @for (item of activity.activities(); track item.id) {
          <div class="activity-item">
            <span class="activity-icon" [class]="'type-' + item.type" aria-hidden="true">
              {{ item.type === 'security' ? '◉' : item.type === 'route' ? '↗' : '•' }}
            </span>
            <div>
              <strong>{{ item.title }}</strong>
              <p>{{ item.detail }}</p>
            </div>
            <time>{{ item.timestamp }}</time>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .hero {
      padding: 80px 0 44px;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 1.08fr 0.92fr;
      gap: 70px;
      align-items: center;
    }

    .page-heading span {
      color: #c4bbff;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 28px;
    }

    .hero-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 18px;
      margin-top: 25px;
      color: var(--muted);
      font-size: 0.76rem;
    }

    .hero-meta span {
      display: inline-flex;
      align-items: center;
      gap: 7px;
    }

    .hero-meta i {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent);
    }

    .orbit {
      position: relative;
      min-height: 390px;
      overflow: hidden;
      isolation: isolate;
      background:
        radial-gradient(circle, rgba(139, 114, 255, 0.1), transparent 55%),
        var(--surface);
    }

    .orbit::after {
      position: absolute;
      inset: 0;
      z-index: -1;
      background-image:
        linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
      background-size: 34px 34px;
      content: '';
    }

    .orbit-ring {
      position: absolute;
      top: 50%;
      left: 50%;
      border: 1px solid rgba(139, 114, 255, 0.25);
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }

    .ring-one {
      width: 230px;
      height: 230px;
    }

    .ring-two {
      width: 320px;
      height: 320px;
      border-color: rgba(31, 212, 174, 0.16);
    }

    .orbit-core {
      position: absolute;
      top: 50%;
      left: 50%;
      display: grid;
      width: 112px;
      height: 112px;
      place-content: center;
      border: 1px solid rgba(255,255,255,.14);
      border-radius: 32px;
      background: linear-gradient(145deg, #242b45, #111725);
      box-shadow: 0 20px 50px rgba(0,0,0,.35);
      text-align: center;
      transform: translate(-50%, -50%);
    }

    .orbit-core span {
      font-size: 2.3rem;
      font-weight: 950;
      color: #d9d2ff;
    }

    .orbit-core small {
      color: var(--muted);
    }

    .orbit-node {
      position: absolute;
      display: grid;
      min-width: 54px;
      min-height: 54px;
      padding: 8px;
      place-items: center;
      border: 1px solid var(--border);
      border-radius: 16px;
      background: rgba(21, 27, 42, .92);
      color: #d8d2ff;
      box-shadow: 0 15px 35px rgba(0,0,0,.25);
      font-size: .65rem;
      font-weight: 900;
    }

    .node-one { top: 15%; left: 18%; }
    .node-two { top: 21%; right: 16%; }
    .node-three { bottom: 18%; left: 16%; }
    .node-four { right: 12%; bottom: 20%; }

    .stats-section {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }

    .catalog,
    .activity-section {
      padding-top: 78px;
    }

    .section-heading {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 22px;
    }

    h2 {
      margin: 0;
      font-size: 1.55rem;
      letter-spacing: -.03em;
    }

    .search {
      display: flex;
      width: min(280px, 100%);
      align-items: center;
      gap: 9px;
      padding: 0 12px;
      border: 1px solid var(--border);
      border-radius: 12px;
      background: var(--surface);
      color: var(--muted);
    }

    .search input {
      width: 100%;
      min-height: 42px;
      border: 0;
      outline: 0;
      color: var(--text);
      background: transparent;
    }

    .feature-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }

    .empty {
      padding: 40px;
      grid-column: 1 / -1;
      color: var(--muted);
      text-align: center;
    }

    .activity {
      overflow: hidden;
    }

    .activity-item {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 13px;
      align-items: start;
      padding: 17px 20px;
      border-bottom: 1px solid var(--border);
    }

    .activity-item:last-child {
      border-bottom: 0;
    }

    .activity-icon {
      display: grid;
      width: 34px;
      height: 34px;
      place-items: center;
      border-radius: 10px;
      background: rgba(139,114,255,.12);
      color: #c9c0ff;
    }

    .type-security {
      background: rgba(31,212,174,.1);
      color: #9af1de;
    }

    .activity-item strong {
      font-size: .87rem;
    }

    .activity-item p {
      margin: 4px 0 0;
      color: var(--muted);
      font-size: .78rem;
      line-height: 1.5;
    }

    time {
      color: var(--muted);
      font-size: .7rem;
    }

    @media (max-width: 900px) {
      .hero-grid {
        grid-template-columns: 1fr;
        gap: 35px;
      }

      .stats-section {
        grid-template-columns: repeat(2, 1fr);
      }

      .feature-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 600px) {
      .hero {
        padding-top: 48px;
      }

      .stats-section,
      .feature-grid {
        grid-template-columns: 1fr;
      }

      .section-heading {
        align-items: stretch;
        flex-direction: column;
      }

      .search {
        width: 100%;
      }

      .orbit {
        min-height: 300px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  protected readonly activity = inject(ActivityService);
  protected readonly authService = inject(AuthService);
  protected readonly catalog = inject(FeatureCatalogService);

  protected readonly featureCount = computed(() => this.catalog.features().length);
  protected readonly pulse = signal(0);

  protected updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.catalog.setSearch(input.value);
  }

  protected simulateActivity(): void {
    const count = this.pulse.update((value) => value + 1);
    void count;

    this.activity.addActivity({
      title: 'Signal event dispatched',
      detail: 'A pure service method immutably added a new activity item.',
      timestamp: 'just now',
      type: 'service',
    });
  }
}
