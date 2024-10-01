import { useState } from "react";
import LoadingSpinner from "../../../common/LoadingSpinner";
import { AgreeAndContinueButton } from "./AgreeAndContinueButton";
import { PayNowButton } from "./PayNow";
import { ReturnButton } from "./ReturnButton";

interface SingleStepButtonSectionProps {
  vipMessage?: string;
  payNowButtonText?: string;
}

const showVip = true;
const isTermsAccepted = false;
const buttonSectionError = false;
const storeData = {
  ShopURL: "https://www.example.com",
};

export const SingleStepButtonSection: React.FC<
  SingleStepButtonSectionProps
> = ({
  vipMessage,
  payNowButtonText, //Dynamic text can be passed
}) => {
  const [loadingSpinner] = useState(false);

  // const isEmpty = (obj: object) => (obj ? Object.keys(obj).length === 0 : true);
  return (
    <>
      <div className="mt-10 sm:items-center sm:justify-between">
        <div className="relative flex justify-center items-center">
          {showVip && !isTermsAccepted ? (
            <AgreeAndContinueButton
              setIsTermsAccepted={() => {}}
              showVip={showVip}
              vipMessage={vipMessage ? vipMessage : undefined} // Conditionally passing vipMessage
            />
          ) : (
            <PayNowButton
              showVip={showVip}
              vipMessage={vipMessage ? vipMessage : undefined} // Conditionally passing vipMessage
              payNowButtonText={payNowButtonText ? payNowButtonText : undefined} // Conditionally passing payNowButtonText
            />
          )}
          {loadingSpinner && (
            <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-90">
              <div className="h-9">
                <LoadingSpinner />
              </div>
            </div>
          )}
        </div>
        <ReturnButton shopUrl={storeData?.ShopURL} />
      </div>
      {buttonSectionError && (
        <div className="text-red-500 text-xs sm:text-right mt-1">
          * Please add items to the cart.
        </div>
      )}
      {/* {!isEmpty(formState?.errors) && (
        <div className="text-red-500 text-xs sm:text-right mt-1">
          * Please fix the errors mentioned above.
        </div>
      )} */}
    </>
  );
};
