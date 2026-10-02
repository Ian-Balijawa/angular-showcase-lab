import { CanDeactivateFn } from '@angular/router';

export interface DirtyAware {
  hasUnsavedChanges(): boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<DirtyAware> = (component) => {
  if (!component.hasUnsavedChanges()) {
    return true;
  }

  return window.confirm(
    'This form has unsaved changes. Leave without saving?',
  );
};
