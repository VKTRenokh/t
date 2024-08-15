import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../../services/storage/storage.service';
import { inject } from '@angular/core';
import { tokenKey } from '../../../shared/constants/token-key.constant';

export const authInterceptor: HttpInterceptorFn = (
  req,
  next,
) =>
  next(
    req.clone({
      headers: req.headers.append(
        'Authorization',
        `Bearer ${inject(StorageService).get(tokenKey)}`,
      ),
    }),
  );
