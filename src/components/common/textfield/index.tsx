import {
  ChangeEvent,
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
} from "react";
import { Controller, FieldValues, RegisterOptions } from "react-hook-form";

interface ITextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  labelKey?: string;
  valueKey?: string;
  defaultOption?: string;
  error?: string;
}

export const TextField = forwardRef(function TextFieldInternal(
  { label, className, error, ...rest }: ITextFieldProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className={`${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className=" relative">
        <input
          type="text"
          ref={ref}
          className="block w-full h-[48px] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder:text-sm"
          {...rest}
        />
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
});

interface ITextFieldControlProps extends ITextFieldProps {
  name: string;
  defaultValue?: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"
  >;
  valueFormatter?: (_value: string) => string;
  onChangeHandler?: (_e: ChangeEvent<HTMLInputElement>) => string;
}
export const TextFieldControl = ({
  name,
  rules,
  valueFormatter,
  onChangeHandler,
  defaultValue,
  ...rest
}: ITextFieldControlProps) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      render={({
        field: { onChange, value, ...restField },
        fieldState: { error },
      }) => {
        return (
          <TextField
            {...rest}
            value={valueFormatter ? valueFormatter(value) : value}
            onChange={(e) =>
              onChange(onChangeHandler ? onChangeHandler(e) : e.target.value)
            }
            {...restField}
            error={error?.message}
          />
        );
      }}
      rules={rules}
    />
  );
};
