import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fx-host',
  }
})
export class ForgotComponent implements OnInit {

  forgotForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {
    if (this.forgotForm.valid) {
      console.log(this.forgotForm.value);
      // this.store.dispatch({
      //   type: LOGIN,
      //   result: this.loginForm.value
      // });
    }
  }

}
