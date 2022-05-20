import { apiResHeader } from "./api-res-header";
export class ApiResponse<T> {
header?:apiResHeader;
body?:T
}
export class ApiResponseDownload<T> {
  size?:number;
  type?:string;
}
