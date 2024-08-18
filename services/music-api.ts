import http from "@/lib/http";
import toast from "react-hot-toast";

class MusicApis {
  constructor() {}

  createMusicApi = async (artist_id: number, payload: any) => {
    try {
      const newPayload = { ...payload, artist_id };

      const res = await http.post(`/music`, newPayload);
      return res?.data;
    } catch (error: any) {
      console.log(error?.response?.data.message);
      toast.error(error?.response?.data.message);
    }
  };

  deleteMusicByIdApi = async (id: number) => {
    try {
      const response = await http.delete<any>(`/music/${id}`);
      return response.data.result;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  editMusicByIdApi = async (id: number, artist_id: number, payload: any) => {
    try {
      const newPayload = { ...payload, artist_id };

      const response = await http.put<any>(`/music/${id}`, newPayload);
      return response.data.result;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
}

export default MusicApis;
