import React from "react";
import { useFormContext } from "react-hook-form";
import AddressForm from "../addressForm";
import { RadioControl, RadioOptions } from "../../../common/radioButton/Radio";

export const BillingForm: React.FC = () => {
  const addressOptions: RadioOptions[] = [
    { id: "1", name: "Same as shipping address", value: true },
    { id: "2", name: "Use a different billing address", value: false },
  ];

  const { watch } = useFormContext();

  return (
    <>
      <section aria-labelledby="billing-heading" className="mb-10">
        <RadioControl
          name="billing_same_as_shipping"
          options={addressOptions}
        />
      </section>
      {!watch("billing_same_as_shipping") && (
        <div className="mt-10">
          <AddressForm fieldPrefix="BillingAddress" />
        </div>
      )}
    </>
  );
};
