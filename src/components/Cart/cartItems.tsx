import React from "react";
import img from "../../asserts/images/tet1.webp";
import { LineItem } from "../../interface/interface";
import { PlusIcon, MinusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { formatPrice } from "../../utils/commonFunction";
import { CartLine } from "../../interface/cartInterface";

interface CartItemProps {
  product: CartLine;
}

export const CartItem: React.FC<CartItemProps> = ({ product }) => {
  // const handleDecrease = async () => {
  //   //    need to implement this function
  // };

  // const handleIncrease = async () => {
  //   //    need to implement this function
  // };

  // const handleRemove = async () => {
  //   //    need to implement this function
  // };

  return (
    <li
      key={product.merchandise?.id}
      className="flex items-start space-x-4 py-6"
    >
      <div style={{ position: "relative" }}>
        <img
          width={500}
          height={500}
          src={product.merchandise?.image?.url || img}
          alt={product.merchandise?.product?.title}
          className="w-20 flex-none rounded-md object-cover object-center aspect-square min-w-[5rem]"
        />
        <div className="quantity-bubble-bg absolute top-0 right-0 min-w-5 min-h-5 px-1 py-0.5 rounded-full bg-black text-white flex items-center justify-center text-xs -mt-2 -mr-2">
          {product.quantity}
        </div>
      </div>
      <div className="flex-auto space-y-1">
        <h3 className="font-normal">{product?.merchandise?.product?.title}</h3>
        <p className="text-gray-500 font-normal">
          {product.merchandise?.product?.title}
        </p>
        {/* <span className="isolate inline-flex rounded-md shadow-sm mt-4">
          <button
            type="button"
            onClick={handleDecrease}
            className="relative inline-flex items-center rounded-l-md bg-white px-1 py-1 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            <span className="sr-only">Previous</span>
            <MinusIcon className="h-6 w-10 lg:h-4 lg:w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleIncrease}
            className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-1 py-1 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            <span className="sr-only">Next</span>
            <PlusIcon className="h-6 w-10 lg:h-4 lg:w-6" aria-hidden="true" />
          </button>
        </span> */}
      </div>

      <div>
        {product.cost?.totalAmount?.amount ? (
          <>
            <p id="discounted-price" className="flex-none text-sm font-normal">
              $
              {formatPrice(
                (
                  parseFloat(product.cost?.totalAmount?.amount) *
                  product.quantity
                ).toString()
              )}
            </p>
            <p className="flex-none text-sm font-normal">
              <span style={{ textDecoration: "line-through", color: "gray" }}>
                $
                {formatPrice(
                  (
                    parseFloat(product.cost?.totalAmount?.amount) *
                    product.quantity
                  ).toString()
                )}
              </span>
            </p>
          </>
        ) : (
          <p className="flex-none text-sm font-normal">
            $
            {formatPrice(
              (
                parseFloat(product.cost?.totalAmount?.amount) * product.quantity
              ).toString()
            )}
          </p>
        )}
      </div>
      {/* <button
        type="button"
        onClick={handleRemove}
        className="hide-remove-button text-gray-400 hover:text-gray-500"
      >
        <span className="sr-only">Remove</span>
        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
      </button> */}
    </li>
  );
};
