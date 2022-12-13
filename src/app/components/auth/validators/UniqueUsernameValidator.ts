import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueUsernameValidator implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.authService.checkUsernameAvailable(control.value).pipe(
      map((isAvailable) => {
        return isAvailable ? null : { availableUsername: false };
      }),
      catchError(() => of(null))
    );
  }
}
