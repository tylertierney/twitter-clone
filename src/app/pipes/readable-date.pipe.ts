import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'readableDate',
})
export class ReadableDatePipe implements PipeTransform {
  transform(value: Date | string): string {
    if (typeof value === 'string') value = new Date(value);
    const diff = new Date().getTime() - value.getTime();
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) {
      return seconds + 's ago';
    }
    if (seconds < 3600) {
      return Math.floor(seconds / 60) + 'm ago';
    }
    if (seconds < 86400) {
      return Math.floor(seconds / 60 / 60) + 'h ago';
    }
    return value.toLocaleDateString('en-us', {
      month: 'short',
      day: 'numeric',
    });
  }
}
