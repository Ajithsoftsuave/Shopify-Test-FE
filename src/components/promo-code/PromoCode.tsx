import { useCallback, useState } from "react";
import { ERROR_EMPTY_PROMO } from "../../utils/constant";

const PromoCode = () => {
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState({ text: "", status: "" });

  // Update only text in promoMessage keeping the status intact
  const updatePromoMessageText = useCallback((text: string) => {
    setPromoMessage((prevState) => ({ ...prevState, text }));
  }, []);

  const handleApplyPromoCode = async () => {
    // apply promo code logic
  };

  const messageClass =
    promoMessage.status === "success" ? "success-message" : "error-message";

  return (
    <>
      <div className="mt-4 mb-6">
        <div className="mt-1 flex space-x-4">
          <input
            aria-label="Promo Code"
            type="text"
            id="discount-code-mobile"
            name="discount-code-mobile"
            placeholder="Promo Code (Case Sensitive)"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder:text-sm"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            onBlur={() =>
              updatePromoMessageText(promoCode.trim() ? "" : ERROR_EMPTY_PROMO)
            }
          />
          <button
            id="promo-button"
            type="button"
            className="rounded-md bg-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            onClick={handleApplyPromoCode}
          >
            Apply
          </button>
        </div>
        <div className={messageClass}>{promoMessage.text}</div>
      </div>
    </>
  );
};

export default PromoCode;
