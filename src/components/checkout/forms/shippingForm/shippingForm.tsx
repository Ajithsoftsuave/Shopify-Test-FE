import React from "react";
import AddressForm from "../addressForm";
import { PhoneNumberControl } from "../../../common/phoneNumberControler/PhoneNumber";
import { phoneRegExp } from "../../../../utils/constant";

const shippingForm = () => {
  return (
    <div className="mt-4 mb-10">
      <AddressForm fieldPrefix="Shipping" />
      <div>
        <PhoneNumberControl
          selectProps={{
            id: "phone_code",
            autoComplete: "phone_code",
          }}
          inputProps={{
            id: "PhoneNumber",
            placeholder: "Phone",
          }}
          phoneNumberName="CustomerData.phone"
          phoneCodeName="phone_code"
          max-length="10"
          rules={{
            required: "Phone number is a required field",
            pattern: {
              value: phoneRegExp,
              message: "Please enter a valid phone number",
            },
          }}
        />
      </div>
    </div>
  );
};

export default shippingForm;
