import Axios, { AxiosError } from "axios";
import {
  ApiErrorResponse,
  ApiPayConfigResponse,
  ApiResponse,
  IGetPayingConfigBody,
  IGetSessionBody,
} from "../../interface/interface";

const baseService = Axios.create({
  baseURL: "https://api.sandbox.rainforestpay.com/v1/",
});

class PaymentService {
  readonly merchantId = "sbx_mid_2meR56qX4sz1klCIXjCuzyMSs7r";
  readonly token =
    "sbx_apikey_98a4c25ac820c691c305ce7af58b3fc4383af377d36a4f7fc8c8cd170a4108b8";

  getConfig = async (
    body: IGetPayingConfigBody
  ): Promise<ApiPayConfigResponse | ApiErrorResponse> => {
    try {
      const response = await baseService.post<ApiPayConfigResponse>(
        "payin_configs",
        body,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return { status: "error", data: null, errors: error.response?.data };
      }
      throw new Error("An unexpected error occurred");
    }
  };

  getSession = async (
    body: IGetSessionBody
  ): Promise<ApiResponse | ApiErrorResponse> => {
    try {
      const response = await baseService.post<ApiResponse>("sessions", body, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return { data: null, status: "error", errors: error.response?.data };
      }
      throw new Error("An unexpected error occurred");
    }
  };
}

export default new PaymentService();
