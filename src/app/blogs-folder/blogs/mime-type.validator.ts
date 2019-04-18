import { AbstractControl } from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';

export const mimeType = (control: AbstractControl):  Promise<{[key: string]: any}> | Observable<{[key: string]: any}> => {
  if (typeof(control.value) === 'string') {
    return of(null); // means valid
  }
  const file = control.value as File;
  const reader = new FileReader();
  const fileObs = Observable.create((observer: Observer<{[key: string]: any}>) => {
    reader.addEventListener('onLoadEnd', () => {
      const arr = new Uint8Array(reader.result).subarray(0, 4);
      let header = '';
      let isValid = false;
      for ( let i = 0; i < arr.length; i++ ) {
        header += arr[i].toString(16);
      }
      switch (header) {
        case '89504e47':
          isValid = true;
          break;
      }

      if (isValid) {
        observer.next(null); // means valid
      } else {
        observer.next({error: 'not valid'});
      }
      observer.complete();
    });
    reader.readAsArrayBuffer(file);
  });
  return fileObs;
};
