import React from "react";
import img from "../../asserts/images/tet1.webp";
import { formatPrice } from "../../utils/commonFunction";
import { CartLine } from "../../interface/cartInterface";

interface CartItemProps {
  product: CartLine;
}

export const CartItem: React.FC<CartItemProps> = ({ product }) => {
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
    </li>
  );
};
