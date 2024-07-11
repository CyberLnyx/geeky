import { DivWithoutScrollBar } from "./DivWithoutScrollBar";
import { Portal } from "./Portal";

interface SupportedFileModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const supportedFileFormats = [
  {
    category: "Lecture Material",
    supportedFormats: [
      "PDF files (.pdf)",
      "PowerPoints (.ppt, .pptx)",
      "Word Document (.docx, .doc, application/msword)",
    ],
  },
  {
    category: "Textbook",
    supportedFormats: ["PDF files (.pdf)"],
  },
  {
    category: "Past Question",
    supportedFormats: [
      "PDF files (.pdf)",
      "Image files (.jpeg, .jpg, .png)",
      "Word Document (.docx, .doc, application/msword)",
    ],
  },
  {
    category: "Assignment",
    supportedFormats: [
      "PDF files (.pdf)",
      "PowerPoints (.ppt, .pptx)",
      "Image files (.jpeg, .jpg, .png)",
      "Word Document (.docx, .doc, application/msword)",
    ],
  },
];

const SupportedFileModal = ({ onClose, isOpen }: SupportedFileModalProps) => {
  return (
    <Portal
      onClose={() => onClose()}
      shouldModalCloseOnClick={false}
      modalContentContainerStyle="rounded-md w-[90%] max-w-[400px] max-h-[220px] h-[85%] md:p-4 md:px-8 p-4 px-6 lg:px-6 lg:p-4 card relative overflow-hidden"
      isOpen={isOpen}
      showBackdropElement={true}
      hideCloseModalButton={true}
      inlineModalContentStyle={{ maxWidth: "400px", maxHeight: "450px" }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-white neue-regular font-bold">
          Support File Formats
        </h2>
      </div>
      <DivWithoutScrollBar
        className="pb-8 sm:pb-32 overflow-auto relative custom-scrollbar"
        style={{
          height: "calc(100% - 90px)",
        }}
      >
        <div className="flex flex-col gap-2">
          {supportedFileFormats.map((format) => (
            <>
              <h3 className="text-white neue-regular text-base mt-2">
                {format.category}
              </h3>
              <ul className="list-inside list-disc ml-4 flex flex-col gap-1">
                {format.supportedFormats.map((f) => (
                  <li className="neue-regular font-medium text-gray-400 text-xs">
                    {f}
                  </li>
                ))}
              </ul>
            </>
          ))}
        </div>
      </DivWithoutScrollBar>
      <div className="flex items-center gap-4 absolute bottom-0 h-max md:p-4 md:px-8 p-4 px-6 lg:px-6 lg:p-4 self-stretch card right-0 left-0 justify-end">
        <button
          className="text-white px-6 py-2 bg-[var(--base-red)] hover:bg-gray-700 transition-all duration-400 rounded-md neue-regular"
          onClick={() => onClose()}
        >
          Close
        </button>
      </div>
    </Portal>
  );
};

export default SupportedFileModal;
