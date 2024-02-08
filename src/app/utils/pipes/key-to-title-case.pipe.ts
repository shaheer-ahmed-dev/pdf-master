import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyToTitleCase',
  standalone: true
})
export class KeyToTitleCasePipe implements PipeTransform {

  transform(value: String, ...args: unknown[]): unknown {
    if (!value) return '';
    
    return value
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  }

}
