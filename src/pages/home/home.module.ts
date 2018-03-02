
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtml',
})
export class StripHtmlPipe implements  PipeTransform {

  transform(value) {
    let striped = value.replace(/<\/?[^>]+(>|$)/g, "")
    return striped;
  }
}