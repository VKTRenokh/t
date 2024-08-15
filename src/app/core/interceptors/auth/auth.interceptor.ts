import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../../services/storage/storage.service';
import { inject } from '@angular/core';
import { tokenKey } from '../../../shared/constants/token-key.constant';

export const authInterceptor: HttpInterceptorFn = (
  req,
  next,
) => {
  const newReq = req.clone();
  const token = inject(StorageService).get(tokenKey);

  if (token) {
    newReq.headers.set('Authorization', `Bearer ${token}`);
  }

  return next(newReq);
};
