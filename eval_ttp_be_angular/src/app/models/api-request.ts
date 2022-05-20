import { apiReqHeader } from './api-req-header';
export class ApiRequest<T> {
  header?: apiReqHeader;
  body?: T;
}
