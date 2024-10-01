import { AxiosError } from "axios";
import { baseService } from ".";
import { IPaymentBody } from "../interface/interface";

class PaymentService {
  placeOrder = async (body: IPaymentBody) => {
    try {
      const response = await baseService.post("/order/create", body);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return { status: "error", data: null, errors: error.response?.data };
      }
      throw new Error("An unexpected error occurred");
    }
  };
}

export default new PaymentService();
