import React, { useEffect, useState } from "react";
import PaymentService from "../../service/payment";
import { useAppSelector } from "../../redux/reduxHooks";
import { useFormContext } from "react-hook-form";
import { IFormContext } from "../../interface/interface";
import paymentService1 from "../../service/paymentService";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

// Extend the window object to include RainforestPay
declare global {
  interface Window {
    RainforestPay: {
      processPayment: (
        paymentDetails: {
          amount: number;
          currency: string;
          description: string;
        },
        callback: (response: { success: boolean; error?: string }) => void
      ) => void;
    };
  }

  namespace JSX {
    interface IntrinsicElements {
      "rainforest-payment": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "payin-config-id"?: string;
        "session-key"?: string;
      };
    }
  }
}

const PaymentSession = () => {
  const [sessionConfig, setSessionConfig] = useState({
    payinConfigId: "",
    sessionKey: "",
  });
  const { watch } = useFormContext<IFormContext>();
  const { cartData } = useAppSelector((state) => state.cart);
  const [searchParams] = useSearchParams();

  const cartID = searchParams.get("cart");
  const shopID = searchParams.get("store");

  const getConfigID = async () => {
    const payload = {
      currency_code: "USD",
      merchant_id: PaymentService.merchantId,
      idempotency_key: Math.random().toString(36).substring(7),
      amount: Number(
        (Number(cartData?.cost?.subtotalAmount?.amount) * 100).toFixed(2)
      ),
    };
    const response = await PaymentService.getConfig(payload);

    if (response.status === "SUCCESS" && response.data) {
      setSessionConfig((pre) => ({
        ...pre,
        payinConfigId: response?.data?.payin_config_id,
      }));
    }
  };

  const getSession = async () => {
    const payload = {
      ttl: 3600,
      statements: [
        {
          permissions: ["group#all"],
          constraints: {
            merchant: {
              merchant_id: PaymentService.merchantId,
            },
          },
        },
      ],
    };
    const response = await PaymentService.getSession(payload);

    if (response.status === "SUCCESS" && response.data) {
      setSessionConfig((pre) => ({
        ...pre,
        sessionKey: response?.data.session_key,
      }));
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://static.rainforestpay.com/sandbox.payment.js";
    script.async = true;

    document.body.appendChild(script);

    getSession();
    getConfigID();

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async (orderData: any) => {
    if (!cartID || !shopID) return;

    const data = watch();
    const payload = {
      cartID: "gid://shopify/Cart/" + cartID,
      shopID: shopID,
      shippingAddress: data.Shipping,
      billingAddress: data?.billing_same_as_shipping
        ? data.Shipping
        : data.BillingAddress,
      billing_same_as_shipping: data.billing_same_as_shipping ? true : false,
      customerDetails: data.CustomerData,
      paymentDetail: {
        kind: "SALE",
        status: orderData?.status as string,
        amount: orderData?.data?.amount as string,
      },
    };

    const res = await paymentService1.placeOrder(payload);

    if (res?.data) {
      toast.success("Order placed successfully");
    } else {
      toast.error("Order placement failed");
    }
  };

  useEffect(() => {
    var component = document.querySelector("rainforest-payment");
    component?.addEventListener("approved", function (data: any) {
      if (data?.detail[0]?.status === "SUCCESS") {
        toast.success("Paymnet successful");
        handlePayment(data?.detail[0]);

        // Payment success
      } else {
        toast.error("Payment failed");
        // Payment failed
      }
    });
  });

  if (sessionConfig?.payinConfigId === "" || sessionConfig?.sessionKey === "")
    return null;

  return (
    <div>
      {/* Add the rainforest-payin-details component here */}
      <rainforest-payment
        payin-config-id={sessionConfig.payinConfigId}
        session-key={sessionConfig.sessionKey}
      ></rainforest-payment>
    </div>
  );
};

export default PaymentSession;
