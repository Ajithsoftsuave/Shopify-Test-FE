import { Cart } from "../../interface/interface";
import { useAppSelector } from "../../redux/reduxHooks";
import { formatPrice, isZeroOrEmpty } from "../../utils/commonFunction";

// const cartData: Cart = {
//   ID: "cart123",
//   Version: 1,
//   CreatedAt: "2024-09-26T10:00:00Z",
//   UpdatedAt: "2024-09-26T10:30:00Z",
//   LineItems: [
//     {
//       ID: "item1",
//       Name: "Wireless Headphones",
//       Subtitle: "Noise Cancelling",
//       ProductID: "prod1",
//       VariantID: "var1",
//       Quantity: 1,
//       OriginalPrice: "200.00",
//       UnitPrice: "180.00",
//       SalePrice: "150.00",
//       TotalPrice: "150.00",
//       OnSale: true,
//       Properties: {
//         property1: "Color: Black",
//         property2: "Battery Life: 20 hours",
//       },
//       ImageURL: "https://example.com/images/headphones.jpg",
//       IsUpsell: false,
//     },
//     {
//       ID: "item2",
//       Name: "Smartphone Stand",
//       Subtitle: "Adjustable and Portable",
//       ProductID: "prod2",
//       VariantID: "var2",
//       Quantity: 2,
//       OriginalPrice: "25.00",
//       UnitPrice: "20.00",
//       SalePrice: "15.00",
//       TotalPrice: "30.00",
//       OnSale: true,
//       Properties: {
//         property1: "Material: Aluminum",
//         property2: "Compatibility: Universal",
//       },
//       ImageURL: "https://example.com/images/stand.jpg",
//       IsUpsell: true,
//     },
//   ],
//   StoreID: "store123",
//   ChannelID: "channel456",
//   HasSubscription: false,
//   Status: "Active",
//   IPAddress: "192.168.1.1",
//   TrafficSource: "Google",
//   OriginalCartID: "cart0",
//   Email: "customer@example.com",
//   PhoneNumber: "123-456-7890",
//   ShippingRequired: true,
//   ShippingMethodID: "ship1",
//   ShippingAddress: {
//     FirstName: "John",
//     LastName: "Doe",
//     Address1: "123 Main St",
//     Address2: "Apt 4B",
//     Organization: "Tech Corp",
//     City: "Metropolis",
//     ProvinceCode: "NY",
//     Zip: "10001",
//     CountryCode: "US",
//   },
//   SubtotalAmount: "180.00",
//   Fees: {
//     shipping: {
//       OriginalCost: "10.00",
//       DiscountedCost: "5.00",
//     },
//   },
//   CartDiscounts: [
//     {
//       Code: "SAVE10",
//       Amount: "10.00",
//       Reason: "10% off on first purchase",
//     },
//   ],
//   TotalAmount: "165.00",
// };

// const selectedShippingMethod = {
//   ID: "ship1",
//   Name: "Standard Shipping",
//   Description: "3-5 business days",
//   Price: "10.00",
//   DiscountedPrice: "5.00",
// };

const OrderDetails = () => {
  const { cartData } = useAppSelector((state) => state.cart);
  return (
    <>
      <dl className="mt-3 space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
        {/* <div className="flex items-center justify-between">
          <dt className="text-gray-600">Subtotal</dt>
          <dd>${formatPrice(cartData?.SubtotalAmount || "")}</dd>
        </div>

        {cartData?.CartDiscounts &&
          cartData?.CartDiscounts.map((index) => {
            if (isZeroOrEmpty(index.Amount)) {
              return null;
            }
            return (
              <div
                key={index.Code}
                className="flex items-center justify-between"
              >
                <dt className="text-gray-600 font-normal text-sm">Discounts</dt>
                <dd>${formatPrice(index.Amount)}</dd>
              </div>
            );
          })} */}

        {/* <div className="flex items-center justify-between">
          <dt className="text-gray-600">Shipping</dt>
          <div className="flex">
            {cartData?.ShippingRequired === false ? (
              <dd>$0.00</dd>
            ) : (
              <>
                <dd
                  className={
                    (selectedShippingMethod?.DiscountedPrice ||
                      cartData?.Fees?.shipping?.DiscountedCost) &&
                    (selectedShippingMethod?.DiscountedPrice !== null ||
                      cartData?.Fees?.shipping?.DiscountedCost !== null)
                      ? "line-through text-gray-400"
                      : ""
                  }
                >
                  $
                  {formatPrice(
                    selectedShippingMethod?.Price ||
                      cartData?.Fees?.shipping?.OriginalCost
                  )}
                </dd>
                {(selectedShippingMethod?.DiscountedPrice ||
                  cartData?.Fees?.shipping?.DiscountedCost) &&
                  (selectedShippingMethod?.DiscountedPrice != null ||
                    cartData?.Fees?.shipping?.DiscountedCost != null) && (
                    <dd className="ml-3">
                      $
                      {formatPrice(
                        (selectedShippingMethod?.DiscountedPrice ||
                          cartData?.Fees?.shipping?.DiscountedCost) ??
                          ""
                      )}
                    </dd>
                  )}
              </>
            )}
          </div>
        </div> */}

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
