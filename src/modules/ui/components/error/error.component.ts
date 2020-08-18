import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fx-flex-fill-host',
  },
})
export class ErrorComponent implements OnInit {
  @Input() error: any;
  constructor() {}

  ngOnInit(): void {}
}
