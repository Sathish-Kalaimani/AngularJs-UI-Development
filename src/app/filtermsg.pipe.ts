import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtermsg'
})
export class FiltermsgPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(it => {

      return it.message.toLowerCase().includes(searchText);

    });

  }
}
