import { ResolveFn } from '@angular/router';

import { LabRouteData } from '../models/demo.models';

export const labResolver: ResolveFn<LabRouteData> = () => ({
  title: 'Angular Feature Lab',
  description:
    'A route resolver prepared this data before the protected page rendered.',
  resolvedAt: new Date().toISOString(),
});
