import React, { useEffect, useState } from "react";
import FormFeedback from "./FormFeedback";
import styled from "styled-components";
import classNames from "classnames";
import { Switch } from "@/components/ui/switch";
import { v4 as uuidv4 } from "uuid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormInputProps {
  name: string;
  type: string;
  placeholder?: string;
  label: string;
  onChange: any;
  onBlur: any;
  value: any;
  validation: any;
  options?: string[];
  disabled?: boolean;
  className?: string;
  min?: any;
  max?: any;
  defaultValue?: any;
  accept?: string;
  inputRef?: any;
  hidden?: boolean;
  handleFileChange?: any;
  maxLength?: number;
  styles?: React.CSSProperties;
  multiple?: boolean;
}

interface DetachableInputProps {
  id: string;
  onRemove: (id: string) => void;
  onChangeValue: (id: string, value: string) => void;
  value: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

const FormInput = ({
  type,
  label,
  onChange,
  onBlur,
  value,
  placeholder,
  name,
  validation,
  options,
  disabled,
  className,
  min,
  max,
  defaultValue,
  accept,
  hidden,
  inputRef,
  handleFileChange,
  maxLength,
  styles,
  multiple,
}: FormInputProps) => {
  if (type === "file" && !handleFileChange)
    throw Error("File Change Handler Required For File Input");

  if (type === "text") {
    return (
      <div className="mb-4 w-full">
        <label htmlFor={name} className="block text-sm font-medium text-white">
          {label}
        </label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          disabled={disabled}
          className={classNames(
            "block border-[1px] rounded-md px-4 py-3 text-xs mt-2 w-full outline-none border-[lightgray] text-gray-300 font-medium bg-[var(--input-bg)] cursor-pointer",
            className
          )}
          maxLength={maxLength}
          style={styles}
        />
        {validation.touched[name] && validation.errors[name] ? (
          <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
        ) : null}
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className="mb-4 w-full">
        <label htmlFor={name} className="block text-sm font-medium text-white">
          {label}
        </label>
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          disabled={disabled}
          maxLength={maxLength}
          style={styles}
          className={classNames(
            className,
            "block border-[1px] rounded-md px-4 py-3 text-xs mt-2 w-full outline-none border-[lightgray] text-gray-300 font-medium bg-[var(--input-bg)] resize-y min-h-32 cursor-pointer"
          )}
        />
        {validation.touched[name] && validation.errors[name] ? (
          <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
        ) : null}
      </div>
    );
  }

  if (type === "select") {
    return (
      <div className="mb-4 w-full">
        <label htmlFor={name} className="block text-sm font-medium text-white">
          {label}
        </label>
        <div className="relative flex items-center w-full">
          <SelectInput
            name={name}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            disabled={disabled}
            className={classNames(
              "block border-[1px] rounded-md px-4 py-3 text-xs mt-2 w-full outline-none border-[lightgray] text-gray-800 font-medium bg-[var(--input-bg)] cursor-pointer relative",
              className
            )}
          >
            <option value={""}>{placeholder}</option>
            {options &&
              options.map((opt) => (
                <option value={opt} className="px-4 py-2">
                  {opt.toUpperCase()}
                </option>
              ))}
          </SelectInput>

          <i className="fi fi-sr-caret-down absolute right-2 top-5 z-100"></i>
        </div>
        {validation.touched[name] && validation.errors[name] ? (
          <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
        ) : null}
      </div>
    );
  }

  if (type === "chad-select") {
    return (
      <div className="mb-4 w-full">
        <label htmlFor={name} className="block text-sm font-medium text-white">
          {label}
        </label>
        <div className="relative flex items-center w-full mt-2">
          <Select
            onValueChange={(newValue: string) =>
              validation.setFieldValue(name, newValue)
            }
            defaultValue={defaultValue}
          >
            <CustomSelectTrigger
              className="w-full bg-transparent text-white neue-regular"
              style={{
                border: "1px solid lightgray",
                outline: "none",
                boxShadow: "none",
              }}
            >
              <SelectValue placeholder={placeholder} />
            </CustomSelectTrigger>
            <SelectContent className="z-[100000010] bg-black">
              {options &&
                options.map((opt) => (
                  <SelectItem
                    value={opt}
                    className="px-4 py-2 cursor-pointer text-[lightgray] neue-regular"
                    aria-roledescription="button"
                    aria-role="button"
                  >
                    <span className="ml-3 neue-regular text-xs">
                      {opt[0].toUpperCase()}
                      {opt.slice(1)}
                    </span>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        {validation.touched[name] && validation.errors[name] ? (
          <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
        ) : null}
      </div>
    );
  }

  if (type === "password")
    return (
      <PasswordInput
        {...{
          type,
          label,
          onChange,
          onBlur,
          value,
          placeholder,
          name,
          validation,
          disabled,
          className,
          maxLength,
        }}
      />
    );

  if (type === "switch") {
    return (
      <div className="mb-4 w-full flex items-center justify-between">
        <label htmlFor={name} className="text-sm font-medium text-white">
          {label}
        </label>
        <Switch
          checked={value}
          onCheckedChange={(value: boolean) =>
            validation.setFieldValue(name, value)
          }
        />

        {validation.touched[name] && validation.errors[name] ? (
          <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
        ) : null}
      </div>
    );
  }

  if (type === "multiple-input") {
    return (
      <MultipleInput
        {...{
          type,
          label,
          onChange,
          onBlur,
          value,
          placeholder,
          name,
          validation,
          disabled,
          className,
          min,
          max,
          defaultValue,
        }}
      />
    );
  }

  if (type === "file") {
    return (
      <div className="mb-4 w-full">
        <label htmlFor={name} className="block text-sm font-medium text-white">
          {label}
        </label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          onBlur={onBlur}
          onChange={handleFileChange}
          disabled={disabled}
          className={classNames(
            "border-[1px] rounded-md px-4 py-3 text-xs mt-2 w-full outline-none border-[lightgray] text-gray-500 font-medium bg-[var(--input-bg)] cursor-pointer",
            className,
            { block: !hidden }
          )}
          min={min}
          max={max}
          hidden={hidden}
          ref={inputRef}
          accept={accept}
          multiple={multiple}
        />
        <button
          type="button"
          className={classNames(
            "border-[1px] rounded-md px-4 py-3 text-xs mt-2 w-full outline-none border-[lightgray] text-gray-500 font-medium bg-[var(--input-bg)] cursor-pointer flex items-center gap-2",
            className
          )}
          onClick={() =>
            inputRef && inputRef.current && inputRef.current.click()
          }
        >
          <i className="fi fi-rr-images flex text-white"></i>
          <span className="neue-regular">Choose File</span>
        </button>
        <p className="text-gray-400 neue-regular text-xs mt-2 text-wrap break-words">
          {value ? `Chosen file: ${value}` : "No file chosen"}
        </p>
        {validation.touched[name] && validation.errors[name] ? (
          <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
        ) : null}
      </div>
    );
  }

  return (
    <div className="mb-4 w-full">
      <label htmlFor={name} className="block text-sm font-medium text-white">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        disabled={disabled}
        className={classNames(
          "block border-[1px] rounded-md px-4 py-3 text-xs mt-2 w-full outline-none border-[lightgray] text-gray-500 font-medium bg-[var(--input-bg)] cursor-pointer",
          className
        )}
        min={min}
        max={max}
        maxLength={maxLength}
      />
      {validation.touched[name] && validation.errors[name] ? (
        <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
      ) : null}
    </div>
  );
};

const PasswordInput = ({
  label,
  name,
  onBlur,
  onChange,
  value,
  type,
  placeholder,
  validation,
  disabled,
  className,
  maxLength,
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mb-4 w-full">
      <label htmlFor={name} className="block text-sm font-medium text-white">
        {label}
      </label>
      <div className="relative flex items-center w-full">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          disabled={disabled}
          maxLength={maxLength}
          className={classNames(
            "block border-[1px] rounded-md px-4 py-3 text-xs mt-2 w-full outline-none border-[lightgray] text-gray-500 font-medium bg-[var(--input-bg)] cursor-pointer",
            className
          )}
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          type="button"
          className="absolute right-2 top-5"
        >
          {showPassword ? (
            <i className="fi fi-sr-eye flex text-white"></i>
          ) : (
            <i className="fi fi-sr-eye-crossed flex text-white"></i>
          )}
        </button>
      </div>
      {validation.touched[name] && validation.errors[name] ? (
        <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
      ) : null}
    </div>
  );
};

type DetachableInputType = {
  id: string;
  value: string;
};

const MultipleInput = ({
  type,
  label,
  onChange,
  onBlur,
  value,
  placeholder,
  name,
  validation,
  disabled,
  className,
  min,
  max,
  defaultValue,
}: FormInputProps) => {
  const [inputs, setInputs] = useState<DetachableInputType[]>([]);

  const onChangeValue = (id: string, value: string) => {
    const updatedInputs = inputs.map((input) => {
      if (input.id === id) {
        return { ...input, value };
      }
      return input;
    });
    setInputs(updatedInputs);
  };

  const onRemove = (id: string) => {
    const updatedInputs = inputs.filter((input) => input.id !== id);
    setInputs(updatedInputs);
  };

  const addNewDetachableInput = () => {
    const newId = uuidv4();
    const newInput = { id: newId, value: "" };
    setInputs([...inputs, newInput]);
  };

  useEffect(() => {
    const values = inputs
      .map((inputData) => inputData.value)
      .filter((value) => value !== "");
    validation.setFieldValue(name, values);
  }, [inputs]);

  useEffect(() => {
    addNewDetachableInput();
  }, []);

  useEffect(() => {
    if (defaultValue && Array.isArray(defaultValue)) {
      const requirementsData = defaultValue.map((requirement: string) => ({
        id: uuidv4(),
        value: requirement,
      }));
      setInputs(requirementsData);
    }
  }, []);

  return (
    <div className="mb-4 w-full">
      <div className="flex justify-between items-center">
        <label htmlFor={name} className="block text-sm font-medium text-white">
          {label}
        </label>
        <button
          className={`w-8 h-8 rounded-md transparent-white grid place-items-center cursor-pointer hover:bg-gray-700 transition-all`}
          type="button"
          onClick={addNewDetachableInput}
        >
          {/* <i className={`text-white flex fi fi-rr-layer-plus text-xl`}></i> */}
          <i className={`text-white flex fi fi-rr-plus-small text-base`}></i>
        </button>
      </div>
      {inputs && inputs.length > 0 && (
        <div className="mt-2">
          <div className="flex flex-col gap-2">
            {inputs.map((inputData, index) => (
              <DetachableInput
                id={inputData.id}
                onChangeValue={onChangeValue}
                onRemove={onRemove}
                disabled={disabled}
                value={inputData.value}
                placeholder={placeholder}
              />
            ))}
          </div>
        </div>
      )}
      {validation.touched[name] && validation.errors[name] ? (
        <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
      ) : null}
    </div>
  );
};

const DetachableInput = ({
  value,
  disabled,
  className,
  onChangeValue,
  onRemove,
  id,
  placeholder,
}: DetachableInputProps) => {
  return (
    <div className="flex gap-2 md:gap-3 items-center mt-2">
      <button
        className={`w-8 h-8 rounded-md transparent-white grid place-items-center cursor-pointer hover:bg-gray-700 transition-all`}
        type={"button"}
        onClick={() => onRemove(id)}
      >
        {/* <i className={`text-white flex fi fi-rr-layer-minus text-sm`}></i> */}
        <i className={`text-white flex fi fi-rr-minus-small text-sm`}></i>
      </button>
      <input
        type={"text"}
        value={value}
        onChange={(e) => onChangeValue(id, e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className={classNames(
          "block border-[1px] rounded-md px-4 py-3 text-xs w-full outline-none border-[lightgray] text-gray-300 font-medium bg-[var(--input-bg)] cursor-pointer neue-regular",
          className
        )}
      />
    </div>
  );
};

const SelectInput = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const CustomSelectTrigger = styled(SelectTrigger)`
  &.focus {
    outline: none !important;
    border: 1px solid lightgray;
    box-shadow: none;
  }

  &::focus {
    outline: none !important;
    border: 1px solid lightgray;
    box-shadow: none;
  }

  span {
    margin-left: 0px;
  }
`;

export default FormInput;
