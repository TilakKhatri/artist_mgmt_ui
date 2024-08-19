import http from "@/lib/http";
import toast from "react-hot-toast";

export interface Root {
  type: string;
  status_code: number;
  message: string;
  result: Result;
}

export interface Result {
  user_count: string;
  artist_count: string;
  music_count: string;
}

export async function getAnalyticData() {
  try {
    const response = await http.get<Root>(`/analytics/all`);
    return response.data?.result;
  } catch (e: any) {
    toast.error(e?.response?.data?.message || "Something went wrong");
    return;
  }
}
