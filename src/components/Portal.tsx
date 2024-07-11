import classNames from "classnames";
import { PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";

interface ModalProps extends PropsWithChildren {
  onClose: () => void;
  modalContentContainerStyle?: string;
  shouldModalCloseOnClick?: boolean;
  inlineModalContentStyle?: any;
  isOpen: boolean;
  hideCloseModalButton?: boolean;
  disableCloseModalButton?: boolean;
  modalClassName?: string;
  modalContentAnimationType?: "bottom-in" | "top-in" | "normal";
  showBackdropElement?: boolean;
}

const defaultStyles =
  "h-[80%] max-h-[650px] flex flex-col relative p-6 md:p-8 lg:p-10 w-10/12 max-w-[900px] bg-black rounded-lg";

export const Portal = ({
  children,
  onClose,
  shouldModalCloseOnClick = true,
  inlineModalContentStyle = {},
  isOpen,
  hideCloseModalButton,
  modalClassName,
  disableCloseModalButton,
  modalContentAnimationType = "top-in",
  showBackdropElement = false,
  modalContentContainerStyle,
}: ModalProps) => {
  const modelRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.maxHeight = "100dvh";
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.maxHeight = "initial";
      document.body.style.overflow = "initial";
    };
  }, [isOpen]);
  return createPortal(
    <ModalContainer
      onClick={(e) => {
        if (!shouldModalCloseOnClick) return;
        if (e.target === modelRef.current) {
          onClose();
          e.stopPropagation();
        }
      }}
      ref={modelRef as any}
      style={{
        display: isOpen ? "grid" : "none",
        cursor: shouldModalCloseOnClick ? "pointer" : "default",
      }}
      className={modalClassName}
    >
      <ModalContentContainer
        className={classNames(
          `custom-modal-content-container ${modalContentAnimationType}`,
          defaultStyles,
          modalContentContainerStyle
        )}
        style={inlineModalContentStyle}
        // showBackdropElement={showBackdropElement}
        showBackdropElement={showBackdropElement!}
      >
        {/* {showBackdropElement && <BackdropElement />} */}
        {hideCloseModalButton || (
          <CloseModalButton
            onClick={onClose}
            disabled={disableCloseModalButton}
          >
            <DangerIcon className="fi fi-sr-circle-xmark flex "></DangerIcon>
          </CloseModalButton>
        )}
        {children}
      </ModalContentContainer>
    </ModalContainer>,
    document.getElementById("portal") as HTMLElement
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100000000;
  display: grid;
  place-items: center;
  animation: fadeIn ease-in 0.3s;
  tab-index: -1;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  & > .custom-modal-content-container.top-in {
    animation: topIn ease-in 0.15s forwards;
    transform: translateY(-40px);
  }

  @keyframes topIn {
    0% {
      opacity: 0;
      transform: translateY(-40px);
    }

    50% {
      opacity: 0.85;
    }

    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  & > .custom-modal-content-container.bottom-in {
    animation: bottomIn ease-in 0.3s forwards;
    transform: translateY(200px);
  }

  @keyframes bottomIn {
    0% {
      opacity: 0;
      transform: translateY(200px);
    }

    50% {
      opacity: 0.85;
    }

    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`;

const ModalContentContainer = styled.div<{ showBackdropElement?: boolean }>`
  ${(props) =>
    props.showBackdropElement &&
    css`
      backdrop-filter: blur(6px);
    `}
`;

const CloseModalButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  outline: none;
  z-index: 10000000000000;
  padding: 0;

  font-size: 1.25rem;
  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
  background-color: #f7666e1a;
`;

const DangerIcon = styled.i`
  display: flex;
  color: #f7666e;
`;
