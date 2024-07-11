import { APIClient } from "./apiCore";
import * as url from "./urls";

const api = new APIClient();

// Upload document
export const uploadDocument = (data: any) => {
  return api.create(url.UPLOAD_DOCUMENT, data);
};
