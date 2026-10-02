import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

@Component({
  selector: 'asl-deferred-insights',
  standalone: true,
  template: `
    <article class="insights card">
      <div>
        <p class="eyebrow">Deferred component</p>
        <h2>Analytics loaded on demand</h2>
        <p class="muted">
          This standalone component is referenced only inside an Angular
          <code>&#64;defer</code>
        </p>
      </div>

      <div class="bars" aria-label="Demo analytics bars">
        @for (bar of bars(); track $index) {
          <div class="bar-column">
            <div class="bar" [style.height.%]="bar"></div>
            <small>{{ $index + 1 }}</small>
          </div>
        }
      </div>

      <div class="insight-row">
        <span>Engagement</span>
        <strong>{{ engagement() }}%</strong>
      </div>
    </article>
  `,
  styles: [`
    .insights {
      display: grid;
      grid-template-columns: .9fr 1.1fr;
      gap: 30px;
      align-items: center;
      margin-top: 14px;
      padding: 28px;
    }

    h2 {
      margin: 0;
      font-size: 1.5rem;
    }

    code {
      color: #c9c0ff;
    }

    .bars {
      display: flex;
      height: 180px;
      align-items: end;
      gap: 10px;
      padding: 12px 0;
    }

    .bar-column {
      display: grid;
      height: 100%;
      flex: 1;
      align-items: end;
      justify-items: center;
      gap: 5px;
    }

    .bar {
      width: 100%;
      max-width: 38px;
      min-height: 12px;
      border-radius: 8px 8px 3px 3px;
      background: linear-gradient(180deg, var(--accent), var(--primary));
    }

    .bar-column small {
      color: var(--muted);
      font-size: .65rem;
    }

    .insight-row {
      grid-column: 1 / -1;
      display: flex;
      justify-content: space-between;
      padding-top: 16px;
      border-top: 1px solid var(--border);
      color: var(--muted);
      font-size: .8rem;
    }

    .insight-row strong {
      color: #bff8e9;
    }

    @media (max-width: 700px) {
      .insights {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeferredInsightsComponent {
  private readonly seed = signal([35, 72, 51, 88, 67, 94, 76, 61]);

  protected readonly bars = computed(() => this.seed());
  protected readonly engagement = computed(() => {
    const values = this.seed();
    return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
  });
}
