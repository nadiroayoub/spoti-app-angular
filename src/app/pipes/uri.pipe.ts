import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'uri',
})
export class UriPipe implements PipeTransform {
  constructor(private domSanitizar: DomSanitizer) {}
  transform(value: string): any {
    const url = 'https://open.spotify.com/embed/track/' + value;
    console.log(url);
    return this.domSanitizar.bypassSecurityTrustResourceUrl(url);
  }
}
