import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CoreService } from '@core/core.service';
import { SignUpModel } from '../../models/signup.model';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { ValidationService } from '../../services/validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [
    trigger('fadeOut', [
      transition(':enter', [
        style({ transform: 'translateX(350px)', opacity: 0 }),
        animate(
          '1s ease-out',
          style({ transform: 'translateX(0%)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  signUpModel: SignUpModel;
  isLoading: boolean;
  invalid:boolean = false;

  errorObserver = {
    firstname: null,
    lastname: null,
    mail: null,
  };

  constructor (
    private formBuilder: FormBuilder,
    private coreService: CoreService,
    private authService: AuthService,
    private validationService: ValidationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.createForm();
    this.coreService.handleFormError(
      this.signUpForm,
      this.errorObserver,
      this.generateErrors
    );
  }

  generateErrors(name: string, owner: string) {
    switch (owner) {
      case 'firstname':
        if (name == 'required') {
          return 'First name is required';
        } else {
          return 'Invalid name';
        }
      case 'lastname':
        if (name == 'required') {
          return 'Last name is required';
        } else {
          return 'Invalid name';
        }
      case 'mail':
        if (name == 'required') {
          return 'mail is required';
        } else if (name == 'isExists') {
          return 'Already has an account with this email';
        } else {
          return 'Invalid email';
        }
    }
  }

  createForm() {
    return this.formBuilder.group(
      {
        firstname: [
          '',
          Validators.compose([Validators.minLength(3), Validators.required]),
        ],
        lastname: [
          '',
          Validators.compose([Validators.minLength(3), Validators.required]),
        ],
        mail: [
          '',
          Validators.compose([Validators.required, Validators.email]),
          // this.validateEmail.bind(this),
        ],
      },
    );
  }

  validateEmail({
    value,
  }: AbstractControl): Observable<ValidationErrors | null> {
    return this.validationService.isEmailExists(value);
  }


  onSubmit() {
    if (!this.signUpForm.valid) {
      this.coreService.checkFormState(this.signUpForm);
      return;
    }
    const result = Object.assign({}, this.signUpForm.value);
    console.log(result);

    this.isLoading = true;
    this.invalid = false;
    this.authService.signUp(result).subscribe(res => {
      console.log(res.isSuccess)
      if(res.isSuccess!=false){
        this.isLoading = false;
        this.router.navigate(["signin"]);
      }else{
        this.invalid = true;
      }
      
    });
  }
}
