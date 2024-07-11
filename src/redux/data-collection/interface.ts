import { ApiResponse } from "@/interfaces";

type LevelType =
  | "100 LEVEL"
  | "200 LEVEL"
  | "300 LEVEL"
  | "400 LEVEL"
  | "500 LEVEL";

type FileMetaData = {
  name: string;
  size: number;
  fullPath: string;
  timeCreated: string | Date;
};

export interface FileContentType {
  downloadUrl: string;
  metadata: FileMetaData;
}

export type UploadDocumentType = {
  level: LevelType;
  department: string;
  courseCode: string;
  isGeneralCourse: boolean;
  category: string;
  document: FileContentType[];
};

export type UploadDocumentApiResponse = ApiResponse;

export interface DataCollectionState {
  uploadingDocument: boolean;
  documentUploaded: boolean;
  uploadError: string;
}
