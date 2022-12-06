import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readableDate',
})
export class ReadableDatePipe implements PipeTransform {
  transform(value: Date | string): string {
    if (typeof value === 'string') value = new Date(value);
    const diff = new Date().getTime() - value.getTime();

    if (diff < 60000) {
      return Math.floor(diff / 1000) + 's ago';
    }
    if (diff < 600000) {
      return Math.floor(diff / 60000) + 'm ago';
    }
    return value.toLocaleDateString('en-us', {
      month: 'short',
      day: 'numeric',
    });
  }
}
