import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bmi'
})
export class BmiPipe implements PipeTransform {

  transform(userData: any, args?: any): any {
    let weight: number;
    let height: number;
    if (userData) {
      weight = Number(userData.weight);
      height = Number(userData.height);
      return weight * height > 0 ?  parseFloat((weight / ((height / 100) ** 2)).toFixed(2)) : 0;
    } else {
      return 0;
    }
  }

}
