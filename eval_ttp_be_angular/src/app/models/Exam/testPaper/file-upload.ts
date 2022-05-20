export interface FileUploadModel {
  file: string;
  name: string;
  fileDetail: number;
  uploadFiles: File;
}

export interface UpdateErrorModel {
  [key: string]: boolean;
}
