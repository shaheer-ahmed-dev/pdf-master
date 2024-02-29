export interface FileModel {
  id: string;
  name: string;

  last_accessed_at: number;
  lastModifiedDate: Date;
  webkitRelativePath: string;
  updated_at: string;
  metaData: FileMetaData;
}

export interface FileMetaData{
  size: number;
  mimetype: string;
  contentLength: number;
}