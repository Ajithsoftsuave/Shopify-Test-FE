import React from "react";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";

interface AgreeAndContinueButtonProps {
  setIsTermsAccepted: (_value: boolean) => void;
  showVip: boolean;
  vipMessage?: string;
}

export const AgreeAndContinueButton: React.FC<AgreeAndContinueButtonProps> = ({
  setIsTermsAccepted,
  showVip,
  vipMessage = "TRY IT RISK FREE! 30-DAY MONEY-BACK GUARANTEE!", // Default message
}) => {
  return (
    <>
      <button
        id="continue-button"
        name="agree-continue-button"
        type="submit"
        className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-4 mb-4 text-2xl lg:text-3xl font-bold text-white shadow-sm sm:order-last"
      >
        <div className="items-center justify-center flex">
          AGREE & CONTINUE <ArrowLongRightIcon className="h-9 w-9 ml-2" />
        </div>
        {showVip && <p className="text-sm my-2 font-medium">{vipMessage}</p>}
      </button>
    </>
  );
};
