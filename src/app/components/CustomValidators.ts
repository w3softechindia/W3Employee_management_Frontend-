import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, map, switchMap, catchError } from 'rxjs/operators';
import { EmployeeService } from '../employee.service';


export class CustomValidators {
  static emailAsyncValidator(service: EmployeeService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null); // No value, no validation
      }
      return control.valueChanges.pipe(
        debounceTime(300),
        switchMap(value =>
          service.checkDuplicateEmail(value).pipe(
            map(isTaken => isTaken ? { duplicateEmail: true } : null),
            catchError(() => of(null))
          )
        )
      );
    };
  }

    static webMailAsyncValidator(employeeService: EmployeeService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
          if (!control.value) {
            return of(null);
          }
      
          return employeeService.checkDuplicateWebMail(control.value).pipe(
            map(isDuplicate => (isDuplicate ? { duplicateWebMail: true } : null)),
            catchError(() => of(null))
          );
        };
      }
      
      static phoneNumberAsyncValidator(employeeService: EmployeeService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
          if (!control.value) {
            return of(null);
          }
      
          return employeeService.checkDuplicatePhoneNumber(control.value).pipe(
            map(isDuplicate => (isDuplicate ? { duplicatePhoneNumber: true } : null)),
            catchError(() => of(null))
          );
        };
      }
    }