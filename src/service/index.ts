import Axios from "axios";

export const baseService = Axios.create({
  baseURL: "http://localhost:3001/api",
});
