import { Address } from "../interface/interface";
import { IGetCartBody } from "../interface/interface";

export const getCartEP = (data: IGetCartBody) => {
  return `/cart/?cartID=gid://shopify/Cart/${data.cartID}&shopID=${data.shopID}`;
};

export const updateDiscount = (data: any) => {
  return `/cart/apply-discount?cartID=gid://shopify/Cart/${data.cartID}&shopID=${data.shopID}&discountCode=${data?.discountCode}`;
};

export const updateAddress = (shopID:string)=>{
  return `/cart/update-shipping?shopID=${shopID}`;
}