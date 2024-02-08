import {inject} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateFn,
  CanDeactivate,
  CanDeactivateFn,
} from '@angular/router';
import {of} from 'rxjs';
import { LocalStorageService } from '../services/localStorageService.service';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  
  const router = inject(Router);

  const token = new LocalStorageService().token;

  if (token) {
    return of(true);
  } else {
    router.navigate(['/auth/login']);
    return of(false);
  }
}
