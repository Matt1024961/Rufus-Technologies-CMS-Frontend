import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-filing',
  templateUrl: './filing.component.html',
  styleUrls: ['./filing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
