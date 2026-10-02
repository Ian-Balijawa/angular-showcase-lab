import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppShellComponent } from './shared/components/app-shell/app-shell.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'asl-root',
  standalone: true,
  imports: [RouterOutlet, AppShellComponent],
  template: `
    <asl-app-shell [isAuthenticated]="authService.isAuthenticated()">
      <router-outlet />
    </asl-app-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly authService = inject(AuthService);
}
