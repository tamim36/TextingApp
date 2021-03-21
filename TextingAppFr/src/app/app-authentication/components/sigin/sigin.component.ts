import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CoreService } from '@core/core.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.scss'],
  animations: [
    trigger('fadeOut', [
      transition(':enter', [
        style({ transform: 'translateX(-350px)', opacity: 0 }),
        animate(
          '1s ease-out',
          style({ transform: 'translateX(0%)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class SiginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean;
  invalid:boolean = false;

  errorObserver$ = {
    mail: '',
  };

  constructor (
    private formBuilder: FormBuilder,
    private coreService: CoreService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.createForm();
    this.coreService.handleFormError(
      this.loginForm,
      this.errorObserver$,
      this.errorTypeGenerator
    );
  }

  errorTypeGenerator(type: string, owner: string) {
    switch (owner) {
      case 'mail':
        return 'Email is required';
    }
  }

  createForm() {
    return this.formBuilder.group({
      mail: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.coreService.checkFormState(this.loginForm);
      return;
    }
    const result = Object.assign({}, this.loginForm.value);
    console.log(result);

    this.isLoading = true;
    this.authService.signin(result).subscribe((res) => {
      console.log(res);
      this.invalid = res==null?true:false;
      this.isLoading = false;
    });
  }
}
