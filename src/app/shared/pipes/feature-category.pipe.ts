import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'featureCategory',
  standalone: true,
  pure: true,
})
export class FeatureCategoryPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
  }
}
