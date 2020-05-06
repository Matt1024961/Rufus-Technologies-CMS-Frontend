import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  randomNumber() {
    const min = 5;
    const max = 100;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    return Array(random);
  }
}
