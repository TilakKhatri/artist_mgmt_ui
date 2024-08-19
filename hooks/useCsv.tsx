import http from "@/lib/http";
import toast from "react-hot-toast";

class useCsvOperation {
  exportCsv = async () => {
    try {
      const response = await http.get("/artists/export");
      const blob = new Blob([response.data], { type: "text/csv" });

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element and set the download attributes
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "artists.csv"); // Specify the file name

      // Append the link to the body and trigger a click
      document.body.appendChild(link);
      link.click();
      console.log(link);
    } catch (error: any) {
      console.log(error?.response?.data.message);
      toast.error(error?.response?.data.message);
    }
  };

  importCsv = async (formdata: FormData) => {
    try {
      const response = await http.post("/artists/import", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response from file: ", response);
      return response.data;
    } catch (error: any) {
      console.log("I am here");
      //   console.log("I got error during file upload");
      console.log(error?.response?.data?.message);
      // toast.error();
      throw new Error(error?.response?.data.message);
    }
  };
}

export default useCsvOperation;
