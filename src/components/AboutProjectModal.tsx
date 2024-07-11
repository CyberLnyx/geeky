import { DivWithoutScrollBar } from "./DivWithoutScrollBar";
import { Portal } from "./Portal";

interface AboutProjectModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const AboutProjectModal = ({ onClose, isOpen }: AboutProjectModalProps) => {
  return (
    <Portal
      onClose={() => onClose()}
      shouldModalCloseOnClick={false}
      modalContentContainerStyle="rounded-md w-[90%] max-w-[400px] max-h-[220px] h-[85%] md:p-4 md:px-8 p-4 px-6 lg:px-6 lg:p-4 card relative overflow-hidden"
      isOpen={isOpen}
      showBackdropElement={true}
      hideCloseModalButton={true}
      inlineModalContentStyle={{ maxWidth: "400px", maxHeight: "270px" }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-white neue-regular font-bold">
          Geeky Repo Project
        </h2>
      </div>
      <DivWithoutScrollBar
        className="pb-8 sm:pb-32 overflow-auto relative custom-scrollbar"
        style={{
          height: "calc(100% - 90px)",
        }}
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-white neue-regular text-base">Introduction</h3>
          {/* <p className="text-white neue-regular text-sm">Hello there! 👋🏻👋</p> */}
          <p className="text-gray-300 neue-regular text-sm">
            Hello there! 👋🏻👋. <br />
            This project was designed with the intention to provide both present
            and incoming students a central repository for accessing{" "}
            <b className="neue-regular">lecture materials</b>,{" "}
            <b className="neue-regular">textbooks</b>,{" "}
            <b className="neue-regular">past questions</b>,{" "}
            <b className="neue-regular">
              assignements(question and/or solution)
            </b>{" "}
            etc.
          </p>
          <h3 className="text-white neue-regular text-base mt-2">
            Development Cycles/Phases
          </h3>
          <p className="text-gray-300 neue-regular text-sm">
            The development process of this project is divided into three main
            cycles/phases.
          </p>
          <ul className="list-inside list-disc ml-4 flex flex-col gap-1">
            <li className="neue-regular font-medium text-gray-400 text-xs">
              Data Collection Phase
            </li>
            <li className="neue-regular font-medium text-gray-400 text-xs">
              Cataloging/Data Processing
            </li>
            <li className="neue-regular font-medium text-gray-400 text-xs">
              Library Interface Development
            </li>
          </ul>
          <h3 className="text-white neue-regular text-base mt-2">
            Current Cycle/Phase
          </h3>
          <p className="text-gray-300 neue-regular text-sm">
            The current phase of this project is the data collection phase.
            During this phase, we request students to provide us with as much
            resource as possible. This resource includes{" "}
            <b className="neue-regular">lecture materials</b>,{" "}
            <b className="neue-regular">textbooks</b>,{" "}
            <b className="neue-regular">past questions</b>,{" "}
            <b className="neue-regular">
              assignements(question and/or solution)
            </b>{" "}
            etc.
          </p>
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

export default AboutProjectModal;
