import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ModuleInterface } from '@modules/user/state/interface';

import { LOGIN } from '@modules/user/state/authentication/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store<ModuleInterface>) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.store.dispatch({
        type: LOGIN,
        result: this.loginForm.value
      });
    }
  }

}
