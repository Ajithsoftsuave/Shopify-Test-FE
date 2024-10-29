import { AxiosError } from "axios";
import { baseService } from ".";
import { Address, ApiErrorResponse, IGetCartBody, IShippingAddress, IShippingAddressPayload } from "../interface/interface";
import { getCartEP, updateAddress, updateDiscount } from "./constant";
import { Cart } from "../interface/cartInterface";

class CartService {
  getCartItems = async (
    body: IGetCartBody
  ): Promise<{ data: Cart } | ApiErrorResponse> => {
    try {
      const response = await baseService.get<{ data: Cart }>(getCartEP(body));
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return { status: "error", data: null, errors: error.response?.data };
      }
      throw new Error("An unexpected error occurred");
    }
  };


  updateDiscount = async (
    body: any
  ): Promise<{ data: any } | ApiErrorResponse> => {
    try {
      const response = await baseService.get<{ data: Cart }>(updateDiscount(body));
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return { status: "error", data: null, errors: error.response?.data };
      }
      throw new Error("An unexpected error occurred");
    }
  };

  updateShipping = async (body: IShippingAddressPayload): Promise<{ data: IShippingAddress } | ApiErrorResponse> => {
    try {
      const response = await baseService.post<{ data: IShippingAddress }>(updateAddress(body?.shopId), body?.deliveryAddress);
      return response.data;
    }
    catch (error) {
      if (error instanceof AxiosError) {
        return { status: "error", data: null, errors: error.response?.data };
      }
      throw new Error("An unexpected error occurred");
    }
  }
}


export default new CartService();
