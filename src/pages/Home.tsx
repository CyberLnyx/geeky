import { useFormik } from "formik";
import * as yup from "yup";
import FormInput from "../components/forms/FormInput";
import Button from "../components/forms/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useRedux } from "../hooks";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  showErrorNotification,
  showInfoNotification,
  showSuccessNotification,
} from "../utils";
import { resetUploadDocument, uploadDocument } from "../redux";
import { Spinner, Loader } from "../components/progress";
import FormFeedback from "@/components/forms/FormFeedback";
import techuLogo from "@/assets/images/techu_logo.png";
import AboutProjectModal from "@/components/AboutProjectModal";

const studentLevels = [
  "100 LEVEL",
  "200 LEVEL",
  "300 LEVEL",
  "400 LEVEL",
  "500 LEVEL",
];

const documentCategories = [
  "Lecture Material",
  "Textbook",
  "Past Question",
  "Assignment",
];

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const Home = () => {
  const documentInputRef = useRef<any>(null);
  const [documents, setDocuments] = useState<any>(null);
  const [aboutProjectOpen, setAboutProjectOpen] = useState<boolean>(false);

  // Check student status
  const uploadDocumentSchema = yup.object({
    level: yup.string().required("Please select your level"),
    // email: yup
    //   .string()
    //   .optional()
    //   // .required("Please Enter Your Email")
    //   .matches(emailRegex, "Please enter a valid email"),
    // name: yup
    //   .string()
    //   .optional()
    //   // .required("Please enter your name")
    //   .matches(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, "Please enter a valid name"),
    courseCode: yup
      .string()
      .required("Please enter course code")
      .matches(/^[a-zA-Z]{3}[\d+]{3}/, "Please enter a valid course code")
      .length(6, "Course code should not be more than 6 chars."),
    isGeneralCourse: yup
      .boolean()
      .required("Specify if the course is a general course"),
    programme: yup.string().required("Please enter your programme"),
    documents: yup.string().required("Please provide at leaset 1 document"),
  });

  const defaultValues = {
    // email: "",
    // name: "",
    level: "100 LEVEL",
    courseCode: "",
    isGeneralCourse: false,
    programme: "",
    category: "Lecture Material",
    documents: "",
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: defaultValues,
    validationSchema: uploadDocumentSchema,
    onSubmit: (values: any) => {
      const formData = new FormData();
      Object.keys(values).map((key: string) => {
        if (key === "documents") {
          documents.forEach((document: any, index: number) => {
            // formData.append(`documents[${index}]`, document);
            formData.append(`documents`, document);
          });
        } else {
          formData.append(key, values[key]);
        }
      });
      dispatch(uploadDocument(formData));
    },
  });

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    setFieldValue,
    resetForm,
  } = validation;

  const { dispatch, useStateSelector } = useRedux();

  // get the register state
  const { documentUploaded, uploadingDocument, uploadError } = useStateSelector(
    (state) => state.DataCollection
  );

  const acceptedFileTypes = useMemo(() => {
    if (values.category === "Lecture Material")
      return ".pdf, .ppt, .pptx, .docx";
    if (values.category === "Textbook") return ".pdf";
    if (values.category === "Past Question") return ".jpeg, .jpg, .png, .pdf";
    return ".pdf, .ppt, .pptx, .jpeg, .jpg, .png";
  }, [values.category]);

  useEffect(() => {
    if (documentUploaded) {
      showSuccessNotification("Thank you for your contribution", 2000);
      dispatch(resetUploadDocument());
      // Clear form
      resetForm();
      setDocuments(null);
      setFieldValue("category", "Lecture Material");
    }
  }, [documentUploaded]);

  useEffect(() => {
    if (uploadError) {
      showErrorNotification(uploadError, 1200);
      dispatch(resetUploadDocument());
      return;
    }
  }, [uploadError]);

  useEffect(() => {
    if (values.isGeneralCourse) {
      setFieldValue("programme", "General Course");
    }
  }, [values.isGeneralCourse]);

  // File Change Handler
  const handleFileChange = async (e: any) => {
    let files = e.target.files;
    let file = files[0];
    let value = "";
    if (file) {
      setDocuments(Array.from(files));
      validation.setFieldValue(
        "documents",
        files.length === 1 ? file.name : `${files.length} files chosen`
      );
    }
  };

  const showAboutProject = () => setAboutProjectOpen(true);
  const hideAboutProject = () => setAboutProjectOpen(false);

  return (
    <div className="w-dvw h-dvh overflow-auto">
      <div className="w-full h-full flex justify-center items-start">
        <div className="w-[90%] max-w-80 py-8">
          <div className="mb-4 mx-auto w-max">
            <img src={techuLogo} className="w-28 text-center" />
          </div>
          <h1 className="text-center text-white text-xl md:text-2xl font-bold neue-regular">
            Geeky Repo
          </h1>
          <p className="text-center text-sm text-gray-400 neue-regular mt-2 mb-6">
            Data Collection Phase
          </p>
          {/* About the project */}
          <button
            className="neue-regular text-xs p-2 transparent-white rounded-md text-gray-300 flex justify-between items-center w-full gap-1 text-left"
            onClick={showAboutProject}
          >
            Click to learn more about the project
            <i className="fi fi-br-info flex"></i>
          </button>
          {uploadingDocument && <Loader />}
          <form
            className="mt-8 auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
              return false;
            }}
          >
            <FormFeedback type="danger" className="neue-regular mb-1">
              Please select the appropriate level for easy cataloging
            </FormFeedback>
            <FormInput
              label="Level"
              name="level"
              onBlur={handleBlur}
              onChange={handleChange}
              type="chad-select"
              value={values.level}
              placeholder="Select Level"
              validation={validation}
              options={studentLevels}
              defaultValue={values.level}
            />

            <FormInput
              label="Course Code"
              name="courseCode"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={values.courseCode}
              placeholder="e.g. MTH101"
              validation={validation}
              maxLength={6}
              className="neue-regular text-gray-300"
            />

            <FormInput
              label="General Course"
              name="isGeneralCourse"
              onBlur={handleBlur}
              onChange={handleChange}
              type="switch"
              value={values.isGeneralCourse}
              validation={validation}
              className="neue-regular text-gray-300"
            />
            {values.isGeneralCourse || (
              <FormInput
                label="Programme"
                name="programme"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.programme}
                placeholder="example: Mechatronics Engineering"
                validation={validation}
                className="neue-regular text-gray-300"
              />
            )}
            <FormInput
              label="Category"
              name="category"
              onBlur={handleBlur}
              onChange={handleChange}
              type="chad-select"
              value={values.category}
              placeholder="Select Category"
              validation={validation}
              options={documentCategories}
              defaultValue={values.category}
              className="neue-regular text-gray-300"
            />
            <FormInput
              label="Document"
              name="documents"
              onBlur={handleBlur}
              onChange={handleChange}
              type="file"
              placeholder="Select Document"
              validation={validation}
              value={values.documents}
              handleFileChange={handleFileChange}
              hidden={true}
              inputRef={documentInputRef}
              accept={acceptedFileTypes}
              multiple={true}
              className="neue-regular text-gray-300"
            />
            {/* <FormInput
              label="How can we contact you for help?"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
              placeholder="example@someemail.com"
              validation={validation}
              className="neue-regular text-gray-300"
            />
            <FormInput
              label="Your Name"
              name="name"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={values.name}
              placeholder="example: John Doe"
              validation={validation}
              className="neue-regular text-gray-300"
            /> */}

            <Button
              type="submit"
              className="mt-6 neue-regular"
              disabled={uploadingDocument}
              style={{ backgroundColor: "var(--base-green)" }}
            >
              {uploadingDocument && <Spinner type="plain" />}
              {uploadingDocument ? "Uploading..." : "Upload"}
            </Button>
          </form>
        </div>
      </div>

      {/* About project model */}
      <AboutProjectModal isOpen={aboutProjectOpen} onClose={hideAboutProject} />
    </div>
  );
};
