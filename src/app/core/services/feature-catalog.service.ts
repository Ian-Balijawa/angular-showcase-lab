import { Injectable, computed, signal } from '@angular/core';

import { FeatureCard } from '../models/demo.models';

@Injectable({
  providedIn: 'root',
})
export class FeatureCatalogService {
  private readonly searchState = signal('');

  readonly search = computed(() => this.searchState());

  readonly features = signal<readonly FeatureCard[]>([
    {
      id: 'signals',
      name: 'Signals',
      description: 'Fine-grained reactive state with computed derivations.',
      category: 'Core',
      icon: '◈',
      route: '/lab',
      status: 'Interactive',
    },
    {
      id: 'components',
      name: 'Components',
      description: 'Standalone, composable UI pieces with explicit imports.',
      category: 'Core',
      icon: '▦',
      route: '/lab',
      status: 'Interactive',
    },
    {
      id: 'pipes',
      name: 'Pipes',
      description: 'Pure display transformation for dates, numbers and text.',
      category: 'Core',
      icon: '⌁',
      route: '/lab',
      status: 'Ready',
    },
    {
      id: 'directives',
      name: 'Directives',
      description: 'Reusable DOM behavior without direct element manipulation.',
      category: 'Core',
      icon: '◎',
      route: '/lab',
      status: 'Ready',
    },
    {
      id: 'guards',
      name: 'Route Guards',
      description: 'CanActivate and CanMatch protect and shape navigation.',
      category: 'Architecture',
      icon: '◉',
      route: '/lab',
      status: 'Interactive',
    },
    {
      id: 'resolver',
      name: 'Resolver',
      description: 'Route data is prepared before the lab page renders.',
      category: 'Architecture',
      icon: '↯',
      route: '/lab',
      status: 'Ready',
    },
    {
      id: 'interceptor',
      name: 'HTTP Interceptor',
      description: 'Central request metadata and typed error handling.',
      category: 'Networking',
      icon: '⇄',
      route: '/http',
      status: 'Interactive',
    },
    {
      id: 'forms',
      name: 'Reactive Forms',
      description: 'Typed validation and a CanDeactivate dirty-state guard.',
      category: 'Forms',
      icon: '✓',
      route: '/forms',
      status: 'Interactive',
    },
    {
      id: 'defer',
      name: '@defer',
      description: 'Non-critical UI is split into a deferred chunk.',
      category: 'Performance',
      icon: '◌',
      route: '/deferred',
      status: 'Interactive',
    },
    {
      id: 'images',
      name: 'NgOptimizedImage',
      description: 'Image loading and layout stability best practices.',
      category: 'Performance',
      icon: '▧',
      route: '/lab',
      status: 'Ready',
    },
  ]);

  readonly filteredFeatures = computed(() => {
    const normalizedSearch = this.searchState().trim().toLowerCase();

    if (!normalizedSearch) {
      return this.features();
    }

    return this.features().filter((feature) =>
      `${feature.name} ${feature.description} ${feature.category}`
        .toLowerCase()
        .includes(normalizedSearch),
    );
  });

  setSearch(value: string): void {
    this.searchState.set(value);
  }
}
