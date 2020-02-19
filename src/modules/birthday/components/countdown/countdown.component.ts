import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountdownComponent implements OnInit {

  config = {
    stopTime: new Date(2020, 5, 16, 20, 0, 0, 0),
    format: 's',
    formatDate: this.formatDate
  };

  constructor() { }

  ngOnInit() {
  }

  formatDate({ date, formatStr, timezone }) {
    const countdownTimeUnits: Array<[string, number]> = [
      ['Y', 1000 * 60 * 60 * 24 * 365], // years
      ['M', 1000 * 60 * 60 * 24 * 30], // months
      ['D', 1000 * 60 * 60 * 24], // days
      ['H', 1000 * 60 * 60], // hours
      ['m', 1000 * 60], // minutes
      ['s', 1000], // seconds
      ['S', 1] // million seconds
    ];
    let duration = Number(date || 0);
    return countdownTimeUnits.reduce((current, [name, unit]) => {
      if (current.indexOf(name) !== -1) {
        const v = Math.floor(duration / unit);
        duration -= v * unit;
        return current.replace(new RegExp(`${name}+`, 'g'), (match: string) => {
          return v.toString().padStart(match.length, '0');
        });
      }
      return current;
    }, formatStr);
  }




}
