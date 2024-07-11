import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uploadDocument as uploadDocumentApi } from "../../api";
import {
  UploadDocumentType,
  UploadDocumentApiResponse,
  DataCollectionState,
  FileContentType,
} from "./interface";
import { uploadFile } from "@/utils";
import { v4 as uuidv4 } from "uuid";

// initial data collection state
const INIT_STATE: DataCollectionState = {
  uploadingDocument: false,
  documentUploaded: false,
  uploadError: "",
};

// upload document
export const uploadDocument: AsyncThunk<string, any, { rejectValue: unknown }> =
  createAsyncThunk("@@uploadDocument", async (data: any, thunkAPI) => {
    try {
      // Upload documents
      let uploadDocPromises: Promise<any>[] = [];
      let docs: FileContentType[] = [];

      const files = data.getAll("documents") as File[];
      const category = data.get("category");

      files.forEach((file) => {
        let uploadPromise = new Promise(async (resolve) => {
          const generatedImageName = uuidv4();
          const { fileDownloadUrl, fileMetaData } = await uploadFile(
            generatedImageName,
            file,
            category.toLowerCase().split(" ").join("-")
          );
          docs.push({
            downloadUrl: fileDownloadUrl,
            metadata: {
              fullPath: fileMetaData.fullPath,
              name: fileMetaData.name,
              size: fileMetaData.size,
              timeCreated: fileMetaData.timeCreated,
            },
          });
          resolve(null);
        });
        uploadDocPromises.push(uploadPromise);
      });

      await Promise.all(uploadDocPromises);

      data.delete("documents");
      // data.set("documents", docs);

      let jsonData: Record<string, any> = {};
      for (let entry of data.entries()) {
        jsonData[entry[0]] = entry[1];
      }
      jsonData.documents = docs;

      const response = (await uploadDocumentApi(
        jsonData
      )) as unknown as UploadDocumentApiResponse;
      return response.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  });

const dataCollectionSlice = createSlice({
  name: "DataCollection",
  initialState: INIT_STATE,
  reducers: {
    resetDataCollectionState: () => INIT_STATE,
    resetUploadDocument: (state: DataCollectionState) => {
      state.uploadingDocument = false;
      state.documentUploaded = false;
      state.uploadError = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadDocument.pending, (state: DataCollectionState) => {
      state.uploadingDocument = true;
      state.documentUploaded = false;
      state.uploadError = "";
    });

    builder.addCase(uploadDocument.fulfilled, (state: DataCollectionState) => {
      state.uploadingDocument = false;
      state.documentUploaded = true;
      state.uploadError = "";
    });

    builder.addCase(
      uploadDocument.rejected,
      (state: DataCollectionState, action: any) => {
        state.uploadingDocument = false;
        state.documentUploaded = false;
        state.uploadError = action.payload as string;
      }
    );
  },
});

export const { resetDataCollectionState, resetUploadDocument } =
  dataCollectionSlice.actions;
export default dataCollectionSlice.reducer;
