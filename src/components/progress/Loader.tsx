import { Spinner, SpinnerType } from "./Spinner";

interface LoaderProps {
  type?: SpinnerType;
  text?: string;
}

export const Loader = ({ type = "brand", text }: LoaderProps) => {
  return (
    <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 z-[100000]">
      <div className="flex flex-col items-center">
        {text && (
          <p className="text-white neue-regular font-semibold text-lg">
            {text}
          </p>
        )}
        <Spinner classNames="h-[40px]" type={type} />
      </div>
    </div>
  );
};
