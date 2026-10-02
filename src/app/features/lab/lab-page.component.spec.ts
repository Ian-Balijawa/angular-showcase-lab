import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { LabPageComponent } from './lab-page.component';

describe('LabPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                lab: {
                  title: 'Angular Feature Lab',
                  description: 'Test route',
                  resolvedAt: new Date().toISOString(),
                },
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the lab page', () => {
    const fixture = TestBed.createComponent(LabPageComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should derive doubleCount from count', () => {
    const fixture = TestBed.createComponent(LabPageComponent);
    const component = fixture.componentInstance;

    expect(component['doubleCount']()).toBe(14);
  });
});
