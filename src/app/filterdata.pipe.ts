import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterdataPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
          if(!items) return [];
          if(!searchText) return items;
          
          searchText = searchText.toLowerCase();
          
    return items.filter(it=> { 
        
        return it.username ? it.username.toLowerCase().includes(searchText) :  it.toLowerCase().includes(searchText);
        
    });
  }
    
    /*transform(items: any[], userSearch: string, circleSearch:string ){
        if (items && items.length){
            return items.filter(item =>{
                if (userSearch && item.name.toLowerCase().indexOf(userSearch.toLowerCase()) === -1){
                    return false;
                }
                if (circleSearch && item.circleName.toLowerCase().indexOf(circleSearch.toLowerCase()) === -1){
                    return false;
                }
                return true;
           })
        }
        else{
            return items;
        }
    }*/
    

}
