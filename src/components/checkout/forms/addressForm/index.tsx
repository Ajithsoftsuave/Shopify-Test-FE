import React, { useRef } from "react";
import { Controller } from "react-hook-form";
import { TextFieldControl } from "../../../common/textfield";
import { countries } from "../../../../utils/constant";
import { Select } from "../../../common/select";

interface AddressFormProps {
  fieldPrefix: string;
}

const AddressForm: React.FC<AddressFormProps> = ({ fieldPrefix }) => {
  let address1FieldRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mt-5 grid grid-cols-1 gap-y-[10px] sm:grid-cols-2 sm:gap-x-4 mb-3">
      <TextFieldControl
        id={`${fieldPrefix}.first_name`}
        name={`${fieldPrefix}.first_name`}
        aria-label="First name"
        placeholder="First name"
        autoComplete="given-name"
        rules={{
          required: "First name is a required field",
          validate: (value) =>
            value.trim() !== "" || "First name cannot be just spaces",
        }}
      />
      <TextFieldControl
        id={`${fieldPrefix}.last_name`}
        name={`${fieldPrefix}.last_name`}
        aria-label="Last name"
        placeholder="Last name"
        autoComplete="family-name"
        rules={{
          required: "Last name is a required field",
          validate: (value) =>
            value.trim() !== "" || "Last name cannot be just spaces",
        }}
      />
      <div className="block w-full sm:col-span-2">
        <Controller
          name={`${fieldPrefix}.address1`}
          defaultValue={""}
          rules={{
            required: "Address is a required field",
            validate: (value) =>
              value.trim() !== "" || "Address cannot be just spaces",
          }}
          render={({ field, fieldState: { error } }) => (
            <>
              <input
                {...field}
                type="text"
                id={`${fieldPrefix}`}
                className="block w-full h-[48px] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder:text-sm"
                ref={address1FieldRef}
                aria-label="Address"
                placeholder="Address"
              />
              <div className="error-message">{error ? error.message : ""}</div>
            </>
          )}
        />
      </div>
      {/* <TextFieldControl
        className="sm:col-span-2"
        name={`${fieldPrefix}.Address2`}
        placeholder="Apartment, suite, etc. (optional)"
        aria-label="Apartment, suite, etc. (optional)"
      /> */}
      {/* <TextFieldControl
        className="sm:col-span-2"
        id={`${fieldPrefix}.Organization`}
        name={`${fieldPrefix}.Organization`}
        placeholder="Company (optional)"
        aria-label="Company (optional)"
      /> */}
      <TextFieldControl
        id={`${fieldPrefix}.city`}
        name={`${fieldPrefix}.city`}
        placeholder="City"
        aria-label="City"
        rules={{
          required: "City is a required field",
          validate: (value) =>
            value.trim() !== "" || "City cannot be just spaces",
        }}
      />
      <Controller
        name={`${fieldPrefix}.country`}
        render={({
          field: { onChange, ...restField },
          fieldState: { error },
        }) => {
          return (
            <Select
              aria-label="Country"
              options={countries}
              onChange={(e) => {
                onChange(e.target.value);
              }}
              valueKey="code"
              labelKey="name"
              {...restField}
              error={error?.message}
            />
          );
        }}
      />
      {
        <div>
          <div className="relative">
            {
              <TextFieldControl
                name={`${fieldPrefix}.province`}
                id={`${fieldPrefix}.province`}
                placeholder="State"
                aria-label="State"
                rules={{
                  required: "State is a required field",
                  validate: (value) =>
                    value.trim() !== "" || "State cannot be just spaces",
                }}
              />
            }
          </div>
        </div>
      }

      <TextFieldControl
        id={`${fieldPrefix}.zip`}
        autoComplete="postal-code"
        name={`${fieldPrefix}.zip`}
        placeholder="ZIP code"
        aria-label="ZIP code"
        rules={{
          required: "ZIP code is a required field",
          validate: (value) =>
            value.trim() !== "" || "ZIP code cannot be just spaces",
        }}
      />
    </div>
  );
};

export default AddressForm;
