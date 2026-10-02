import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { DirtyAware } from '../../core/guards/unsaved-changes.guard';

@Component({
  selector: 'asl-forms-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="container page-content">
      <p class="eyebrow">Reactive Forms</p>
      <h1 class="page-heading">Build a typed form that knows when you’re leaving.</h1>
      <p class="page-subtitle">
        This page demonstrates FormBuilder, validators, touched state and a
        CanDeactivate guard that protects unsaved work.
      </p>

      <form class="form-card card" [formGroup]="form" (ngSubmit)="save()">
        <div class="form-grid">
          <label>
            <span>Name</span>
            <input
              class="form-control"
              [class.invalid]="isInvalid('name')"
              formControlName="name"
              autocomplete="name"
              placeholder="Ada Lovelace"
            />
            @if (isInvalid('name')) {
              <small class="error">Name is required and must be at least 2 characters.</small>
            }
          </label>

          <label>
            <span>Email</span>
            <input
              class="form-control"
              [class.invalid]="isInvalid('email')"
              formControlName="email"
              type="email"
              autocomplete="email"
              placeholder="ada@example.com"
            />
            @if (isInvalid('email')) {
              <small class="error">Enter a valid email address.</small>
            }
          </label>
        </div>

        <label>
          <span>What should the app demonstrate?</span>
          <textarea
            class="form-control"
            [class.invalid]="isInvalid('idea')"
            formControlName="idea"
            placeholder="Describe a feature..."
          ></textarea>
          @if (isInvalid('idea')) {
            <small class="error">Give the idea at least 20 characters.</small>
          }
        </label>

        <div class="form-footer">
          <span class="status">
            {{ form.dirty ? 'Unsaved changes' : 'No changes yet' }}
          </span>

          <button class="btn btn-primary" type="submit" [disabled]="form.invalid">
            Save demo
          </button>
        </div>

        @if (saved) {
          <div class="success" role="status">
            ✓ Saved locally for the demo. Navigation is safe now.
          </div>
        }
      </form>

      <a class="back-link" routerLink="/">← Return to showcase</a>
    </section>
  `,
  styles: [`
    .page-content {
      padding-top: 70px;
    }

    .form-card {
      display: grid;
      gap: 22px;
      max-width: 820px;
      margin-top: 32px;
      padding: 26px;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    label {
      display: block;
    }

    label > span {
      display: block;
      margin-bottom: 7px;
      color: #dfe4ef;
      font-size: .82rem;
      font-weight: 700;
    }

    .form-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      padding-top: 5px;
    }

    .status {
      color: var(--muted);
      font-size: .8rem;
    }

    button:disabled {
      cursor: not-allowed;
      opacity: .45;
    }

    .success {
      padding: 13px;
      border: 1px solid rgba(31,212,174,.18);
      border-radius: 12px;
      color: #a9f6e5;
      background: rgba(31,212,174,.07);
      font-size: .82rem;
    }

    .back-link {
      display: inline-block;
      margin-top: 22px;
      color: var(--muted);
      font-size: .82rem;
    }

    @media (max-width: 650px) {
      .form-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsPageComponent implements DirtyAware {
  private readonly formBuilder = inject(FormBuilder);

  protected readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    idea: ['', [Validators.required, Validators.minLength(20)]],
  });

  protected saved = false;

  protected isInvalid(controlName: 'name' | 'email' | 'idea'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  protected save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saved = true;
    this.form.markAsPristine();
  }

  hasUnsavedChanges(): boolean {
    return this.form.dirty && !this.saved;
  }
}
