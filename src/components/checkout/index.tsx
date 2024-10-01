import React, { Component, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import contactInfoForm from "./forms/contactInfoForm/contactInfoForm";
import shippingForm from "./forms/shippingForm/shippingForm";
import { BillingForm } from "./forms/billingForm/BillingForm";
import Cart from "../Cart/Cart";
import PromoCode from "../promo-code/PromoCode";
import OrderDetails from "../orderDetails/OrderDetails";
import { SingleStepButtonSection } from "./forms/Aggreebutton/SingleStepButtonSection";
import { IFormContext } from "../../interface/interface";
import PaymentSession from "../payment";

const defaultValues: IFormContext = {
  CustomerData: {
    email: "",
  },
  Shipping: {
    first_name: "",
    last_name: "",
    address1: "",
    phone: "",
    city: "",
    province: "",
    country: "",
    zip: "",
  },
  BillingAddress: {
    first_name: "",
    last_name: "",
    address1: "",
    phone: "",
    city: "",
    province: "",
    country: "",
    zip: "",
  },
  billing_same_as_shipping: true,
};

const steps = [
  {
    name: "STEP 1",
    heading: "CONTACT INFORMATION",
    component: contactInfoForm,
  },
  {
    name: "STEP 2",
    heading: "SHIPPING ADDRESS",
    component: shippingForm,
  },
  {
    name: "STEP 3",
    heading: "BILLING ADDRESS",
    component: BillingForm,
  },
  // {
  //   name: "STEP 4",
  //   heading: "SHIPPING METHOD",
  // },
  {
    name: "STEP 3",
    heading: "PAYMENT METHOD",
    component: PaymentSession,
  },

  // {
  //   component: SingleStepButtonSection,
  // },
];

const Checkout = () => {
  const methods = useForm<IFormContext>({
    defaultValues,
    mode: "onChange",
  });

  const { isValid } = methods.formState;

  const [showPayment, setShowPayment] = useState(false);

  const onSubmit = (data: IFormContext) => {
    console.log("data", data);
  };

  useEffect(() => {
    if (showPayment) {
      setShowPayment(isValid);
    }
  }, [isValid]);

  return (
    <div id="font-family">
      <div>
        <div className="bg-white">
          <div
            className="fixed left-0 top-0 hidden h-full w-1/2 bg-white lg:block"
            aria-hidden="true"
          />
          <div
            className="fixed right-0 top-0 hidden h-full w-1/2 lg:block"
            aria-hidden="true"
          />
          <div className="relative mx-auto grid sm:max-w-8xl lg:max-w-6xl xl:max-w-6xl grid-cols-1 gap-x-8 lg:grid-cols-12 lg:px-8 xl:gap-x-8">
            <section
              aria-labelledby="summary-heading"
              className="right-container lg:col-start-9 lg:col-span-10 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16 mt-7"
            >
              <div className="mx-auto max-w-2xl lg:max-w-none">
                <div
                  style={{ backgroundColor: "rgb(248,248,249)" }}
                  className={`overflow-hidden transition-all ease-in-out px-6 py-6 `}
                >
                  <Cart />
                  {/* <PromoCode /> */}
                  <OrderDetails />
                </div>
              </div>
            </section>

            <div className="left-container lg:col-span-8">
              <div className="px-4 pt-6 pb-14 lg:pt-8 sm:pt-6 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16">
                <div className="inner-section mx-auto max-w-2xl lg:max-w-none">
                  <FormProvider {...methods}>
                    <form onSubmit={methods?.handleSubmit(onSubmit)}>
                      <div className="mx-auto max-w-2xl lg:max-w-none">
                        {steps?.map((step, index) => {
                          if (
                            step.heading === "PAYMENT METHOD" &&
                            !showPayment
                          ) {
                            return (
                              <div className="flex align-center justify-center">
                                <button
                                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                  onClick={() => {
                                    setShowPayment(isValid);
                                  }}
                                >
                                  Proceed To Payment
                                </button>
                              </div>
                            );
                          }
                          return (
                            <div key={index}>
                              <div className="flex items-center">
                                {step && (
                                  <h2
                                    id="step-header-text"
                                    className="text-lg  mr-3 font-bold"
                                  >
                                    {step?.name}
                                  </h2>
                                )}
                                <p className="font-bold" id="step-header-text ">
                                  {step?.heading}
                                </p>
                              </div>
                              {step.component
                                ? React.createElement(step.component)
                                : null}
                            </div>
                          );
                        })}
                      </div>
                    </form>
                  </FormProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
