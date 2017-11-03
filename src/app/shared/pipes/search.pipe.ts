import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'search'})
export class SearchPipe implements PipeTransform {
  transform(value: any, args: any): any {
    let source : any = [];
    //if (!value) return value;
    if(args != undefined){
        value.filter(eachValue => {
            if(eachValue){
                if(eachValue.Hours_Guaranteed == args){
                    source.push(eachValue);
                }
            }
        })
        return source;
    }
    else{
        return value;
    }
  }
}