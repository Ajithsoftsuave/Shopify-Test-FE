import { RadioGroup } from "@headlessui/react";
import {
  ChangeEvent,
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
  useState,
} from "react";
import { Controller, FieldValues, RegisterOptions } from "react-hook-form";

export interface RadioOptions {
  id: string;
  name: string;
  value: boolean;
}

interface IRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  options: RadioOptions[];
  className?: string;
  error?: string;
}

interface IRadioControlProps extends IRadioProps {
  name: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"
  >;
}

export const RadioControl = ({ name, rules, ...rest }: IRadioControlProps) => {
  return (
    <Controller
      name={name}
      render={({
        field: { value, onChange, ...restField },
        fieldState: { error },
      }) => {
        return (
          <Radio
            {...rest}
            checked={value}
            onChange={onChange}
            {...restField}
            error={error?.message}
          />
        );
      }}
      rules={rules}
    />
  );
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Radio = forwardRef(function RadioInternal(
  { onChange, options, ...rest }: IRadioProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [selected, setSelected] = useState(options[0].value);

  const handleChange = (value: boolean) => {
    setSelected(value);
    if (onChange) {
      onChange(value as unknown as ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <RadioGroup value={selected} onChange={handleChange}>
      <p className="text-sm text-gray-500 mb-2">
        Specify the address for your payment option
      </p>
      <div className="-space-y-px rounded-md bg-white">
        {options.map((option, optionIdx) => (
          <RadioGroup.Option
            {...rest}
            ref={ref}
            key={option.name}
            value={option.value}
            className={({ checked }) =>
              classNames(
                optionIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                optionIdx === options.length - 1
                  ? "rounded-bl-md rounded-br-md"
                  : "",
                checked ? "z-5" : "border-gray-200",
                "relative flex cursor-pointer border p-4 focus:outline-none"
              )
            }
          >
            {({ checked }) => (
              <>
                <span
                  className={classNames(
                    checked
                      ? "radio-button bg-indigo-600 border-transparent"
                      : "bg-white border-gray-300",
                    "mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center"
                  )}
                  aria-hidden="true"
                >
                  <span className="rounded-full bg-white w-1.5 h-1.5" />
                </span>
                <span className="ml-3 flex flex-col">
                  <RadioGroup.Label
                    as="span"
                    className={classNames("text-gray-900", "block text-sm ")}
                  >
                    {option.name}
                  </RadioGroup.Label>
                </span>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
});
