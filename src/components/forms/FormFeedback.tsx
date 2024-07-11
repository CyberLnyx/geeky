import classNames from "classnames";
import React, { PropsWithChildren } from "react";

interface FeedbackProps extends PropsWithChildren {
  type: string;
  className?: string;
}

const FormFeedback = ({ children, className }: FeedbackProps) => {
  return (
    <div
      className={classNames(
        "w-full mt-1 text-xs text-[var(--feedback-color)] font-medium neue-regular",
        className
      )}
    >
      {children}
    </div>
  );
};
export default FormFeedback;
