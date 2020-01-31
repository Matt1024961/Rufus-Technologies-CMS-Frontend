import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '@env/environment';


@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainMenuComponent implements OnInit {

  public version: string = environment.version;
  constructor() {
  }

  ngOnInit() {
  }

}
