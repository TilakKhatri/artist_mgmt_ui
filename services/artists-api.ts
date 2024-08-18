import http from "@/lib/http";
import toast from "react-hot-toast";

class ArtistApis {
  constructor() {}

  createArtistApi = async (payload: any) => {
    try {
      console.log({ payload });
      const res = await http.post("/artists", payload);
      return res?.data;
    } catch (error: any) {
      console.log(error?.response?.data.message);
      toast.error(error?.response?.data.message);
    }
  };
  getArtistsApi = async (query: string) => {
    try {
      // console.log({ query });
      const response = await http.get<any>(`/artists${query}`);
      // console.log("data", response?.data?.result);
      return response.data?.result;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Something went wrong");
      return;
    }
  };
  getArtistByIdApi = async (id: number) => {
    try {
      const response = await http.get<any>(`/artists/${id}`);
      return response.data.result;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return;
    }
  };

  getArtistDetailApi = async (id: number) => {
    try {
      const response = await http.get<any>(`/artists/${id}/music`);
      return response?.data?.result;
    } catch (error: any) {
      console.log(error.message);
      toast.error(error?.response?.data?.message || "Something went wrong");
      return;
    }
  };

  deleteArtistByIdApi = async (id: number) => {
    try {
      const response = await http.delete<any>(`/artists/${id}`);
      return response.data.result;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  editArtistByIdApi = async (id: number, payload: any) => {
    try {
      const response = await http.put<any>(`/artists/${id}`, payload);
      return response.data.result;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
}

export default ArtistApis;
