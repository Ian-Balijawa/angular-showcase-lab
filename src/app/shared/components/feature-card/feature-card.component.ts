import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FeatureCard } from '../../../core/models/demo.models';
import { FeatureCategoryPipe } from '../../pipes/feature-category.pipe';
import { HoverLiftDirective } from '../../directives/hover-lift.directive';

@Component({
  selector: 'asl-feature-card',
  standalone: true,
  imports: [RouterLink, FeatureCategoryPipe, HoverLiftDirective],
  template: `
    <article class="feature-card card" aslHoverLift>
      <div class="feature-top">
        <span class="feature-icon" aria-hidden="true">{{ feature().icon }}</span>
        <span class="badge">{{ feature().status }}</span>
      </div>

      <div>
        <p class="category">{{ feature().category | featureCategory }}</p>
        <h3>{{ feature().name }}</h3>
        <p class="description">{{ feature().description }}</p>
      </div>

      @if (feature().route) {
        <a class="explore" [routerLink]="feature().route">
          Explore <span aria-hidden="true">↗</span>
        </a>
      }
    </article>
  `,
  styles: [`
    .feature-card {
      display: flex;
      min-height: 220px;
      flex-direction: column;
      justify-content: space-between;
      padding: 20px;
      transition: transform 160ms ease, border-color 160ms ease;
    }

    .feature-card:hover {
      border-color: rgba(139, 114, 255, 0.34);
    }

    .feature-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .feature-icon {
      display: grid;
      width: 42px;
      height: 42px;
      place-items: center;
      border-radius: 12px;
      color: #d8d1ff;
      background: rgba(139, 114, 255, 0.12);
      font-size: 1.25rem;
      font-weight: 900;
    }

    .category {
      margin: 22px 0 6px;
      color: var(--accent);
      font-size: 0.7rem;
      font-weight: 800;
      letter-spacing: 0.11em;
      text-transform: uppercase;
    }

    h3 {
      margin: 0;
      font-size: 1.12rem;
    }

    .description {
      min-height: 48px;
      margin: 9px 0 0;
      color: var(--muted);
      font-size: 0.86rem;
      line-height: 1.6;
    }

    .explore {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      color: #d9d2ff;
      font-size: 0.82rem;
      font-weight: 800;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureCardComponent {
  readonly feature = input.required<FeatureCard>();
}
