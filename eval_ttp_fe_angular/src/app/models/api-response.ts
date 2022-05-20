import { apiResHeader } from './api-res-header';

export class ApiResponse<T> {
  header?: apiResHeader;
  body?: T;
}
