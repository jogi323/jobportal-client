import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'search', pure: false })
export class SearchPipe implements PipeTransform {
    transform(value: any, args: any): any {
        let source: any = [];
        if (!value) return value;
        if (args.Position != '' && args.pay_request != null && args.distance != null) {
            value.filter(eachValue => {
                if (eachValue) {
                    if (eachValue.JS_id.Position == args.Position && eachValue.JS_id.Hourly_Pay == args.pay_request && eachValue.Distance == args.distance) {
                        source.push(eachValue);
                    }
                }
            })
            return source;
        }
        else if (args.Position == '' && args.pay_request == null && args.distance != null) {
            value.filter(eachValue => {
                if (eachValue) {
                    if (eachValue.Distance == args.distance) {
                        source.push(eachValue);
                    }
                }
            })
            return source;
        }
        else if (args.Position == '' && args.pay_request != null && args.distance == null) {
            value.filter(eachValue => {
                if (eachValue) {
                    if (eachValue.JS_id.Hourly_Pay == args.pay_request) {
                        source.push(eachValue);
                    }
                }
            })
            return source;
        }
        else if (args.Position != '' && args.pay_request == null && args.distance == null) {
            value.filter(eachValue => {
                if (eachValue) {
                    if (eachValue.JS_id.Position == args.Position) {
                        source.push(eachValue);
                    }
                }
            })
            return source;
        }
        else if (args.Position != '' && args.pay_request != null && args.distance == null) {
            value.filter(eachValue => {
                if (eachValue) {
                    if (eachValue.JS_id.Position == args.Position && eachValue.JS_id.Hourly_Pay == args.pay_request) {
                        source.push(eachValue);
                    }
                }
            })
            return source;
        }
        else if (args.Position != '' && args.pay_request == null && args.distance != null) {
            value.filter(eachValue => {
                if (eachValue) {
                    if (eachValue.JS_id.Position == args.Position && eachValue.Distance == args.distance) {
                        source.push(eachValue);
                    }
                }
            })
            return source;
        }
        else if (args.Position == '' && args.pay_request != null && args.distance != null) {
            value.filter(eachValue => {
                if (eachValue) {
                    if (eachValue.JS_id.Hourly_Pay == args.pay_request && eachValue.Distance == args.distance) {
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