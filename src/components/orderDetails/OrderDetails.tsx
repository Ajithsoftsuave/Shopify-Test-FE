import { useAppSelector } from "../../redux/reduxHooks";
import { formatPrice, isZeroOrEmpty } from "../../utils/commonFunction";

const OrderDetails = () => {
  const { cartData } = useAppSelector((state) => state.cart);
  return (
    <>
      <dl className="mt-3 space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
          <dt className="text-base">Grand Total</dt>

          <dd className="text-base">
            ${formatPrice(cartData?.cost?.subtotalAmount?.amount)}
          </dd>
        </div>
      </dl>
    </>
  );
};

export default OrderDetails;
