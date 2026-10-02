export interface ActivityItem {
  readonly id: number;
  readonly title: string;
  readonly detail: string;
  readonly timestamp: string;
  readonly type: 'component' | 'service' | 'route' | 'security' | 'performance';
}

export interface FeatureCard {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly category: 'Core' | 'Architecture' | 'Performance' | 'Forms' | 'Networking';
  readonly icon: string;
  readonly route?: string;
  readonly status: 'Ready' | 'Interactive';
}

export interface LabRouteData {
  readonly title: string;
  readonly description: string;
  readonly resolvedAt: string;
}

export interface HttpDemoResponse {
  readonly source: string;
  readonly requestId: string;
  readonly message: string;
  readonly receivedAt: string;
}

export interface DemoError {
  readonly code: string;
  readonly message: string;
  readonly status: number;
}
