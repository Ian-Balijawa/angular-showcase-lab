# Angular Showcase Lab

A small, modern Angular application designed as a hands-on tour of major Angular concepts.

## What it demonstrates

- Standalone components
- Component composition and reusable UI
- Signals, computed signals, and effects
- Dependency injection with `inject()`
- Services and immutable state updates
- Typed models/interfaces
- Custom pipes
- Custom attribute directive
- Built-in control flow: `@if`, `@for`, `@switch`
- Reactive forms and validation
- Routing and lazy-loaded feature routes
- `CanActivateFn` authentication guard
- `CanMatchFn` feature guard
- `CanDeactivateFn` unsaved-changes guard
- Route resolver
- HTTP interceptor
- Typed HttpClient service
- `@defer` deferred rendering
- `NgOptimizedImage`
- Accessibility-friendly semantic markup
- Responsive SCSS
- Unit tests with Jasmine/Karma
- Error handling and typed application errors

## Requirements

- Node.js 20.19+ recommended
- npm 10+
- Angular CLI 20+

## Run

```bash
npm install
npm start
```

Then open:

http://localhost:4200

## Explore

1. Dashboard: live signals, service-driven activity, and component composition.
2. Feature Lab: a searchable matrix of Angular concepts.
3. Forms: reactive forms, validation, custom dirty-state guard.
4. Protected Lab: guarded route and feature toggle.
5. HTTP Lab: interceptor adds a demo request ID and gracefully handles the fake API.
6. Deferred Insights: `@defer` loads a non-critical analytics component.
7. Route data: resolver supplies page data before rendering.

## Important security note

The auth guard is a client-side UX/demo mechanism only. Real authorization must also be enforced by the server.
