import http from "@/lib/http";
import toast from "react-hot-toast";

class UserApis {
  constructor() {}

  createUserApi = async (payload: any) => {
    try {
      console.log({ payload });
      const res = await http.post("/users", payload);
      return res?.data;
    } catch (error: any) {
      console.log(error?.response?.data.message);
      toast.error(error?.response?.data.message);
    }
  };
  getUserssApi = async (query: string) => {
    try {
      // console.log({ query });
      const response = await http.get<any>(`/users${query}`);
      // console.log("data", response?.data?.result);
      return response.data?.result;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Something went wrong");
      return;
    }
  };
  getUserByIdApi = async (id: string) => {
    try {
      const response = await http.get<any>(`/users/${id}`);
      return response.data.result;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return;
    }
  };

  deleteUserByIdApi = async (id: number) => {
    try {
      const response = await http.delete<any>(`/users/${id}`);
      return response.data.result;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  editUserByIdApi = async (id: number, payload: any) => {
    try {
      const response = await http.put<any>(`/users/${id}`, payload);
      return response.data.result;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
}

export default UserApis;
