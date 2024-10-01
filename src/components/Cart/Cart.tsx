import { useSearchParams } from "react-router-dom";
import { LineItem } from "../../interface/interface";
import cartServics from "../../service/cartServics";
import { CartItem } from "./cartItems";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCartData } from "../../redux/slice/cartSlice";
import { useAppSelector } from "../../redux/reduxHooks";

// const cartData = {
//   LineItems: [
//     {
//       ID: "1",
//       Name: "Product 1",
//       Subtitle: "Product 1 subtitle",
//       ProductID: "1",
//       VariantID: "1",
//       Quantity: 1,
//       OriginalPrice: "100",
//       UnitPrice: "100",
//       SalePrice: "90",
//       TotalPrice: "90",
//       OnSale: true,
//       Properties: {
//         property1: "value1",
//         property2: "value2",
//       },
//       ImageURL: "",
//       IsUpsell: false,
//     },
//     {
//       ID: "2",
//       Name: "Product 2",
//       Subtitle: "Product 2 subtitle",
//       ProductID: "2",
//       VariantID: "2",
//       Quantity: 1,
//       OriginalPrice: "200",
//       UnitPrice: "200",
//       SalePrice: "190",
//       TotalPrice: "190",
//       OnSale: true,
//       Properties: {
//         property1: "value1",
//         property2: "value2",
//       },
//       ImageURL: "",
//       IsUpsell: false,
//     },
//   ],
// };

const Cart = () => {
  const [searchParams] = useSearchParams();
  const dispach = useDispatch();
  const { cartData } = useAppSelector((state) => state.cart);

  const getCartItems = async (cartID: string, shopID: string) => {
    const response = await cartServics.getCartItems({ cartID, shopID });
    if (response?.data) {
      dispach(setCartData(response.data));
    } else dispach(setCartData(null));
  };

  useEffect(() => {
    const cartID = searchParams.get("cart");
    const shopID = searchParams.get("store");
    if (cartID && shopID) getCartItems(cartID, shopID);
  }, []);

  return (
    <>
      <ul className="divide-y divide-gray-200 text-sm font-medium text-gray-900">
        <div className={`relative w-full opacity-100`}>
          {cartData?.lines?.edges?.map((line) => (
            <CartItem key={line?.node?.id} product={line?.node} />
          ))}
        </div>
      </ul>
    </>
  );
};

export default Cart;
