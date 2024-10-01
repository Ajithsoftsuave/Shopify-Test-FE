import { AxiosError } from "axios";
import { baseService } from ".";
import { ApiErrorResponse, IGetCartBody } from "../interface/interface";
import { getCartEP } from "./constant";
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
}

export default new CartService();
