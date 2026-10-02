import { Injectable, computed, signal } from '@angular/core';

import { ActivityItem } from '../models/demo.models';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private readonly activitiesState = signal<readonly ActivityItem[]>([
    {
      id: 1,
      title: 'Component tree rendered',
      detail: 'Standalone shell composed with child components.',
      timestamp: 'just now',
      type: 'component',
    },
    {
      id: 2,
      title: 'Route guard ready',
      detail: 'Protected feature route is waiting for authentication.',
      timestamp: '2 min ago',
      type: 'security',
    },
    {
      id: 3,
      title: 'Signals synchronized',
      detail: 'Dashboard counters are derived without manual subscriptions.',
      timestamp: '5 min ago',
      type: 'service',
    },
  ]);

  readonly activities = computed(() => this.activitiesState());

  addActivity(activity: Omit<ActivityItem, 'id'>): void {
    this.activitiesState.update((items) => [
      {
        ...activity,
        id: Math.max(0, ...items.map(({ id }) => id)) + 1,
      },
      ...items,
    ]);
  }
}
