import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fx-flex-fill-host',
  },
})
export class LoadingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
