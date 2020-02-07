import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestfulService {

  constructor() { }

  getBarGraph() {
    const simpleObservable = new Observable((observer) => {
      const arrayLength = 12;
      const newArray = new Array(arrayLength);
      for (let i = 0; i < arrayLength; i++) {
        const min = 1;
        const max = 512;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        newArray[i] = {
          label: `Label ${i + 1}`,
          data: randomNumber
        };
      }

      observer.next(newArray);
      observer.complete();
    }).pipe(delay(3000));
    return simpleObservable;

  }

  getPieGraph() {
    const simpleObservable = new Observable((observer) => {
      const arrayLength = 9;
      const newArray = new Array(arrayLength);
      for (let i = 0; i < arrayLength; i++) {
        const min = 1;
        const max = 512;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        newArray[i] = {
          label: `Label ${i + 1}`,
          data: randomNumber
        };
      }

      observer.next(newArray);
      observer.complete();
    }).pipe(delay(2500));
    return simpleObservable;
  }

  getLineGraph() {
    const simpleObservable = new Observable((observer) => {
      const arrayLength = 9;
      const newArray = new Array(arrayLength);
      for (let i = 0; i < arrayLength; i++) {
        const min = 1;
        const max = 512;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        newArray[i] = {
          label: `Label ${i + 1}`,
          data: randomNumber
        };
      }

      observer.next(newArray);
      observer.complete();
    }).pipe(delay(1500));
    return simpleObservable;
  }

}
