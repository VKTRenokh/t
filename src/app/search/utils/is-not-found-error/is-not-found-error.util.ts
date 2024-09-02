import { ApiError } from '../../../shared/models/api-error.model';

export const isNotFoundError = (
  error: unknown,
): error is ApiError =>
  typeof error === 'object' &&
  !!error &&
  'reason' in error &&
  error.reason === 'stationNotFound';
