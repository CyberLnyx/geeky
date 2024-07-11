import { Spinner, SpinnerType } from "./Spinner";

interface LoaderProps {
  type?: SpinnerType;
  text?: string;
  subText?: string;
}

export const Loader = ({ type = "brand", text, subText }: LoaderProps) => {
  return (
    <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 z-[100000]">
      <div className="flex flex-col items-center max-w-80 bg-black bg-opacity-80">
        {text && (
          <p className="text-white neue-regular font-semibold text-lg text-center">
            {text}
          </p>
        )}
        {subText && (
          <p className="text-gray-300 neue-regular font-medium text-sm text-center my-2">
            {subText}
          </p>
        )}
        <Spinner classNames="h-[40px]" type={type} />
      </div>
    </div>
  );
};
