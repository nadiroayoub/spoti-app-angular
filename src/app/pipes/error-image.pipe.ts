import { Pipe, PipeTransform } from '@angular/core';
import { Image } from '../models/newRealease.interface';

@Pipe({
  name: 'errorImage',
})
export class ErrorImagePipe implements PipeTransform {
  transform(images: Image[]): string {
    if (!images) {
      console.log('!images');
      return 'assets/noimage.png';
    }
    if (images.length > 0) {
      return images[0].url;
    } else {
      return 'assets/noimage.png';
    }
  }
}
