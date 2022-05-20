export interface FileUploadModel {
  file: string;
  name: string;
  fileDetial: number;
  uploadFiles: File;
}

export interface UpdateErrorModel {
  [key: string]: boolean;
}
