import { ForwardedRef, SelectHTMLAttributes, forwardRef } from "react";
import { Controller, FieldValues, RegisterOptions } from "react-hook-form";

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  className?: string;
  options: any[];
  labelKey?: string;
  valueKey?: string;
  defaultOption?: string;
  error?: string;
  additionalStyles?: string;
}

export const Select = forwardRef(function TextFieldInternal(
  {
    label,
    className,
    options = [],
    labelKey = "label",
    valueKey = "value",
    defaultOption = "Select",
    error,
    additionalStyles = "",
    ...rest
  }: ISelectProps,
  ref: ForwardedRef<HTMLSelectElement>
) {
  return (
    <div className={`${className}`}>
      {label && (
        <label
          htmlFor="email"
          className="block text-sm font-normal text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={`block text-sm font-normal w-full h-[48px] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${additionalStyles}`}
          {...rest}
        >
          <option value="" disabled>
            {defaultOption}
          </option>
          {options &&
            options.map((option, index) => (
              <option key={index} value={option?.[valueKey]}>
                {option?.[labelKey]}
              </option>
            ))}
        </select>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
});

interface ISelectControlProps extends ISelectProps {
  name: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"
  >;
}
export const SelectControl = ({
  name,
  rules,
  ...rest
}: ISelectControlProps) => {
  return (
    <Controller
      name={name}
      render={({
        field: { onChange, ...restField },
        fieldState: { error },
      }) => {
        return (
          <Select
            {...rest}
            onChange={(e) => onChange(e.target.value)}
            {...restField}
            error={error?.message}
          />
        );
      }}
      rules={rules}
    />
  );
};
