import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor () { }

  handleFormError(
    formGorup: FormGroup,
    errorObservers: object,
    errorTypeGenerator: (type: string, owner: string) => any
  ) {
    // console.log(formGorup.controls);
    Object.keys(formGorup.controls).forEach((field) => {
      // console.log(field);
      errorObservers[field] = formGorup.controls[field].statusChanges.pipe(
        filter((status) => status === 'INVALID'),
        map(() => {
          if (!formGorup.controls[field].errors) {
            return null;
          }
          for (let errName in formGorup.controls[field].errors) {
            // console.log(errName);
            let errorType = errorTypeGenerator(errName, field.toString());
            return errorType;
          }
        })
      );
    });
  }

  checkFormStatus(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      console.log(field);
      formGroup.controls[field].updateValueAndValidity();
    });
  }
}
