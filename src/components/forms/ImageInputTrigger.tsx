import classNames from "classnames";

interface ImageInputTriggerProps {
  disabled?: boolean;
  className?: string;
  inputRef?: any;
  handleFileChange: any;
}

const ImageInputTrigger = ({
  disabled,
  className,
  handleFileChange,
  inputRef,
}: ImageInputTriggerProps) => {
  return (
    <div className="mb-4 w-full">
      <div className="flex-1">
        <input
          type={"file"}
          name={"trigger"}
          onChange={handleFileChange}
          disabled={disabled}
          className={classNames(
            "border-[1px] rounded-md px-4 py-3 text-xs mt-2 w-full outline-none border-[lightgray] text-gray-500 font-medium bg-[var(--input-bg)] cursor-pointer",
            className
          )}
          hidden={true}
          ref={inputRef}
          accept={".jpeg, .jpg, .png"}
        />
        <button
          type="button"
          className={classNames(
            "border-[1px] rounded-md px-4 py-3 text-4xl mt-2 w-full outline-none border-[lightgray] text-gray-500 font-medium bg-[var(--input-bg)] cursor-pointer flex items-center gap-2 h-56 justify-center flex-col border-dashed border-spacing-4 hover:bg-gray-900 transition-all",
            className
          )}
          onClick={(e: any) => {
            inputRef && inputRef.current
              ? inputRef.current.click()
              : e.target.previousElementSibling.click();
          }}
        >
          <i className="fi fi-rr-images flex text-white pointer-events-none"></i>
          <span className="neue-regular pointer-events-none text-xl">
            Choose File
          </span>
        </button>
      </div>
    </div>
  );
};

export default ImageInputTrigger;
