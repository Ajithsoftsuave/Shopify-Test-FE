import React, { useDeferredValue, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import contactInfoForm from "./forms/contactInfoForm/contactInfoForm";
import shippingForm from "./forms/shippingForm/shippingForm";
import { BillingForm } from "./forms/billingForm/BillingForm";
import Cart from "../Cart/Cart";
import OrderDetails from "../orderDetails/OrderDetails";
import { IFormContext, IShippingAddress, IShippingAddressUpdate } from "../../interface/interface";
import PaymentSession from "../payment";
import Discount from "../Discount/Discount";
import { useSearchParams } from "react-router-dom";
import CartService from '../../service/cartServics';
import { toast } from "react-toastify";
import { setCartData } from "../../redux/slice/cartSlice";
import { useDispatch } from "react-redux";
import cartServics from "../../service/cartServics";
import { useAppSelector } from "../../redux/reduxHooks";

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
  {
    name: "STEP 3",
    heading: "PAYMENT METHOD",
    component: PaymentSession,
  },
];

const Checkout = () => {
  const methods = useForm<IFormContext>({
    defaultValues,
    mode: "onChange",
  });

  const [searchParams] = useSearchParams();

  const cartID = searchParams.get("cart") ?? '';
  const shopID = searchParams.get("store") ?? '';

  const address1 = useDeferredValue(methods.watch("Shipping.address1"));
  const city = methods.watch("Shipping.city");
  const country = methods.watch("Shipping.country");
  const province = methods.watch("Shipping.province");
  const zip = methods.watch("Shipping.zip");
  const firstName = methods.watch("Shipping.first_name");
  const lastName = methods.watch("Shipping.last_name");
  const email = methods.watch("CustomerData.email");

  const dispatch = useDispatch();
  const { cartData } = useAppSelector((state) => state.cart);
  const { isValid } = methods.formState;
  const [showPayment, setShowPayment] = useState(false);


  const onSubmit = (data: IFormContext) => {
    console.log("data", data);
  };

  const getCartItems = async (cartID: string, shopID: string) => {
    const response = await cartServics.getCartItems({ cartID, shopID });
    if (response?.data) {
      dispatch(setCartData(response.data));
    } else dispatch(setCartData(null));
  };

  const updateShipping = async (deliveryAddress: IShippingAddress) => {
    try {
      const lineItems = cartData?.lines?.edges?.map((item: any) => {
        return {
          "variantId": item?.node?.merchandise?.id,
          "quantity": item?.node?.quantity
        }
      })

      const res:any = await CartService.updateShipping({
        deliveryAddress: {
          checkoutId:localStorage.getItem("checkoutId") ?? '',
          lineItems: lineItems,
          ...deliveryAddress
        },
        shopId: shopID
      });
      if (res?.updatedCart?.data) {
        localStorage.setItem("checkoutId", res?.updatedCart?.data?.checkoutShippingAddressUpdateV2?.checkout?.id);
        toast.success("Order placed successfully");
        await getCartItems(cartID, shopID);
      }
    } catch (err) {
      toast.error("Provide a valid Shipping address");
    }

  }

  useEffect(() => {
    if (showPayment) {
      setShowPayment(isValid);
    }
  }, [isValid]);

  useEffect(() => {
    const {
      Shipping: { address1, city, province, country, zip, first_name, last_name },
      CustomerData: { email },
    } = methods.getValues();
  
    const areAllFieldsFilled =
      [address1, city, province, country, zip, first_name, last_name, email].every(
        (field) => field?.length > 0
      );
  
    if (areAllFieldsFilled) {
      const debounceTimeout = setTimeout(() => {
        const prepareShippingData: IShippingAddress = {
          cartId: cartID,
          shippingAddress: {
            address1,
            city,
            province,
            country,
            zip,
            firstName: first_name,
            lastName: last_name,
          },
          email,
        };
        updateShipping(prepareShippingData);
      }, 500);
  
      return () => clearTimeout(debounceTimeout);
    }
  }, [ address1, city, province, country, zip, email]);
  

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
                  <Discount />
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


