import { useDispatch } from "react-redux";
import { setCartData } from "../../redux/slice/cartSlice";
import { toast } from "react-toastify";
import { useAppSelector } from "../../redux/reduxHooks";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import cartService from "../../service/cartServics";
import { TextFieldControl } from "../common/textfield";


const Discount = () => {

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [discountCode, setDiscountCode] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountCode(e.target.value);
  };

  const updateDiscountDetails = async (cartID: string, shopID: string, discountCode: string) => {
    const response = await cartService.updateDiscount({ cartID, shopID, discountCode });
    if (response?.data) {
      setButtonClicked(true);
      toast.success("Discount applied successfully");
      await getCartItems(cartID, shopID)
    } else dispatch(setCartData(null));
  };

  const getCartItems = async (cartID: string, shopID: string) => {
    const response = await cartService.getCartItems({ cartID, shopID });
    if (response?.data) {
      dispatch(setCartData(response.data));
    } else dispatch(setCartData(null));
  };

  async function updateCartAfterDiscount() {

    const cartID = searchParams.get("cart");
    const shopID = searchParams.get("store");
    if (cartID && shopID) {
      updateDiscountDetails(cartID, shopID, discountCode)
    }
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <input
          type="text"
          name="discount"
          placeholder="Enter your coupon code"
          className="border border-gray-300 rounded p-2"
          value={discountCode}
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={updateCartAfterDiscount}
          disabled={discountCode.length == 0 || buttonClicked}
        >
          Apply Discount
        </button>
      </div>
    </>
  )
}

export default Discount