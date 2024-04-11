import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueEmailValidator implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.authService.checkEmailAvailable(control.value).pipe(
      map((isAvailable) => {
        return isAvailable ? null : { emailTaken: true };
      }),
      catchError(() => of(null))
    );
  }
}
