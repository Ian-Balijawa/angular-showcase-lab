import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'asl-stat-tile',
  standalone: true,
  template: `
    <article class="stat card">
      <span class="icon" aria-hidden="true">{{ icon() }}</span>
      <div>
        <span class="label">{{ label() }}</span>
        <strong>{{ value() }}</strong>
      </div>
    </article>
  `,
  styles: [`
    .stat {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 17px;
    }

    .icon {
      display: grid;
      width: 42px;
      height: 42px;
      place-items: center;
      border-radius: 12px;
      background: var(--surface-3);
      color: var(--accent);
      font-weight: 900;
    }

    .label,
    strong {
      display: block;
    }

    .label {
      color: var(--muted);
      font-size: 0.72rem;
    }

    strong {
      margin-top: 3px;
      font-size: 1.25rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatTileComponent {
  readonly icon = input.required<string>();
  readonly label = input.required<string>();
  readonly value = input.required<string>();
}
