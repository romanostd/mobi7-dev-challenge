import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metersToKilometers'
})
export class MetersToKilometersPipe implements PipeTransform {

  transform(value: number): string {
    if (value == null) {
      return '';
    }
    const kilometers = value / 1000;
    return kilometers.toFixed(2) + ' km'; 
  }

}
