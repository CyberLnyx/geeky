import {
  deleteObject,
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase/init"; // Adjust the path as necessary

export const deleteFile = async (filePath: string) => {
  try {
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
    console.log("File deleted successfully");
  } catch (error: any) {
    if (typeof error === "string") return error;
    if (error.message) return error.message;
  }
};

export const uploadFile = async (
  uniqueId: string,
  file: any,
  bucketName: string
) => {
  const thumbNailRef = ref(storage, `${bucketName}/${uniqueId}-${file.name}`);
  await uploadBytes(thumbNailRef, file, {
    contentType: file.mimetype,
  });
  const fileDownloadUrl = await getDownloadURL(thumbNailRef);
  const fileMetaData = await getMetadata(thumbNailRef);
  return { fileDownloadUrl, fileMetaData };
};

export const getFileMetaData = async (url: string) => {
  const defaultFileRef = ref(storage, url);
  const metaData = await getMetadata(defaultFileRef);
  console.log("metadatas", metaData);
};
