import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(value: any, searchText?: any): any {
    if (!searchText) return value;
    console.log(value);
    console.log(searchText);

    return value.filter(
      (item: { empEnName: string }) =>
        item.empEnName.toLowerCase().indexOf(searchText.toLowerCase()) > -1
    );
  }
}
