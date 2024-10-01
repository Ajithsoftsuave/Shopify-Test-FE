import { IGetCartBody } from "../interface/interface";

export const getCartEP = (data: IGetCartBody) => {
  return `/cart/?cartID=gid://shopify/Cart/${data.cartID}&shopID=${data.shopID}`;
};
