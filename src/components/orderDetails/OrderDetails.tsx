import { useAppSelector } from "../../redux/reduxHooks";
import { formatPrice, isZeroOrEmpty } from "../../utils/commonFunction";

const OrderDetails = () => {

  const { cartData } = useAppSelector((state) => state.cart);

  let discountAmount = 0;
  for (const eachDiscount of cartData?.discountAllocations || []) {
    discountAmount += parseFloat(eachDiscount.discountedAmount.amount);
  }

  return (
    <>
      <dl className="mt-3 space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">

        <div className="flex items-center justify-between border-gray-200 pt-6">
          <dt className="text-base">Sub Total</dt>
          <dd className="text-base">
            {formatPrice(cartData?.cost?.subtotalAmount?.amount)}
          </dd>
        </div>

        <div className="flex items-center justify-between pt-6">
          <dt className="text-base">Tax Amount</dt>
          <dd className="text-base">
            {formatPrice(cartData?.cost?.totalTaxAmount?.amount)}
          </dd>
        </div>

        <div className="flex items-center justify-between pt-6">
          <dt className="text-base">Discounted Amount</dt>
          <dd className="text-base">
            {formatPrice("" + discountAmount)}
          </dd>
        </div>

        <div className="flex items-center justify-between border-gray-200 pt-6">
          <dt className="text-base">Grand Total</dt>
          <dd className="text-base">
            ${formatPrice(cartData?.cost?.totalAmount?.amount)}
          </dd>
        </div>

      </dl>
    </>
  );
};

export default OrderDetails;
