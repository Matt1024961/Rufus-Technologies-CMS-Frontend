import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-authenticated-user-menu',
  templateUrl: './authenticated-user-menu.component.html',
  styleUrls: ['./authenticated-user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticatedUserMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
