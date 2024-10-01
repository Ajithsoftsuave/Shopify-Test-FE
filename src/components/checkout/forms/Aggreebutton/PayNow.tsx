import React from 'react';
import { ArrowLongRightIcon } from '@heroicons/react/20/solid';

interface PayNowButtonProps {
  showVip: boolean;
  vipMessage?: string;
  payNowButtonText?: string; // Updated to use payNowButtonText prop
}

export const PayNowButton: React.FC<PayNowButtonProps> = ({
  showVip,
  vipMessage = 'TRY IT RISK FREE! 30-DAY MONEY-BACK GUARANTEE!',
  payNowButtonText = 'COMPLETE PURCHASE', // Default value for payNowButtonText
}) => {
  return (
    <>
      <button
        id="continue-button"
        type="submit"
        className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-4 mb-4 text-2xl lg:text-3xl font-bold text-white shadow-sm sm:order-last">
        <div className="items-center justify-center flex flex-nowrap">
          {payNowButtonText} <ArrowLongRightIcon className="h-9 w-9 ml-2" />
        </div>
        {showVip &&
          vipMessage && ( // Display if showVip is true and vipMessage is provided
            <p className="text-sm my-2 font-medium">{vipMessage}</p>
          )}
      </button>
    </>
  );
};
