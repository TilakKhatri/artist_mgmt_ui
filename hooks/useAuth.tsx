import http from "@/lib/http";
import { ApiResponse, LoginPayload, RegisterPayload, User } from "@/types/user";

import toast from "react-hot-toast";

class UseAuth {
  loginApiCall = async (payload: LoginPayload) => {
    try {
      const res = await http.post("/auth/login", payload);
      // console.log(res.data);
      return res?.data;
    } catch (error: any) {
      console.log(error?.response?.data.message);
      toast.error(error?.response?.data.message);
      return;
    }
  };

  registerApiCall = async (payload: RegisterPayload) => {
    try {
      const res = await http.post("/auth/register", payload);
      // console.log(res);
      return res?.data;
    } catch (error: any) {
      console.log(error?.response?.data.message);
      toast.error(error?.response?.data.message);
      return;
    }
  };
}

export default UseAuth;
