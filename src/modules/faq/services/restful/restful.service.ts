import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestfulService {

  constructor() { }

  getFaqs(input = { result: { previousPageIndex: 0, pageIndex: 0, pageSize: 10, length: 100 } }) {
    console.log(input.result);
    const simpleObservable = new Observable((observer) => {
      const arrayLength = input.result.pageIndex + input.result.pageSize;
      const newArray = new Array(arrayLength);
      for (let i = 0; i < arrayLength; i++) {
        newArray[i] = {
          question: `Question?`,
          answer: `The Answer! Yay!`
        };
      }

      observer.next(newArray);
      observer.complete();
    }).pipe(delay(500));
    return simpleObservable;

  }


}
