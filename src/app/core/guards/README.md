# Guards

The demo includes:

- `auth.guard.ts` — `CanActivateFn`
- `feature.guard.ts` — `CanMatchFn`
- `unsaved-changes.guard.ts` — `CanDeactivateFn`

The `/lab` route demonstrates the first two. The forms feature is prepared
for a `CanDeactivate` route guard; add it to the `/forms` route if you want to
make the guard explicit in the route table:

```ts
{
  path: 'forms',
  canActivate: [authGuard],
  canDeactivate: [unsavedChangesGuard],
  ...
}
```

The supplied form implements the required `DirtyAware` contract.
