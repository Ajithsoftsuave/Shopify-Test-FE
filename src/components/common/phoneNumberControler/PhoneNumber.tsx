import {
  ForwardedRef,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  forwardRef,
} from "react";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { countries, Country } from "../../../utils/constant";

export interface IPhoneValue {
  phoneCode?: string;
  phoneNumber?: string;
}

export interface IPhoneNumberProps {
  label?: string;
  error?: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  selectProps: SelectHTMLAttributes<HTMLSelectElement>;
}

const countryCodeList = countries.reduce(
  (filteredCountries: Country[], country: Country) => {
    return filteredCountries.some((c) => c.phoneCode === country.phoneCode)
      ? filteredCountries
      : [...filteredCountries, country];
  },
  []
);

export const PhoneNumber = forwardRef(function PhoneNumberInternal(
  { label, error, inputProps, selectProps }: IPhoneNumberProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="">
      {label && (
        <label
          htmlFor="PhoneNumber"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Phone Number
        </label>
      )}
      <div className="mt-2 rounded-md shadow-sm relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center">
            <label htmlFor="phone_code" className="sr-only">
              Country
            </label>
            <select
              className="h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              {...selectProps}
            >
              {countryCodeList.map((country) => (
                <option key={country.phoneCode}>+{country.phoneCode}</option>
              ))}
            </select>
          </div>
          <input
            ref={ref}
            type="text"
            placeholder="(555) 987-6543"
            className="pl-20 block h-[48px] w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:text-sm"
            {...inputProps}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
});

interface IPhoneNumberControlProps extends IPhoneNumberProps {
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"
  >;
  phoneNumberName: string;
  phoneCodeName: string;
}

export const PhoneNumberControl = ({
  phoneNumberName,
  phoneCodeName,
  rules,
  selectProps: { ...restSelectProps },
  inputProps: { ...restInputProps },
}: IPhoneNumberControlProps) => {
  const { setValue, watch } = useFormContext();
  return (
    <Controller
      name={phoneNumberName}
      render={({
        field: { value, onChange, ...restField },
        fieldState: { error },
      }) => {
        return (
          <PhoneNumber
            selectProps={{
              value: watch(phoneCodeName),
              onChange: (e) =>
                setValue(phoneCodeName, e.target.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                }),
              ...restSelectProps,
            }}
            inputProps={{
              value: value,
              onChange: (e) => onChange(e.target.value),
              ...restInputProps,
              ...restField,
            }}
            error={error?.message}
          />
        );
      }}
      rules={rules}
    />
  );
};
