import { ApiError } from '../../../shared/models/api-error.model';

export const isNotFoundError = (error: ApiError) =>
  error.reason === 'stationNotFound';
