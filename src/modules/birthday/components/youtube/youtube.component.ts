import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
