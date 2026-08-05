import { useState } from "react";
import { toast } from "sonner";
import { API_URL } from "../config/api";

function useApi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = async (endpoint, options = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}${endpoint}`, options);
      const result = await response.json();
      if (!response.ok) {
        console.log("error", result.message);
        toast.error(result.message);
        throw new Error(result.message || "Something went wrong");
      }
      setData(result);
      return result;
    } catch (err) {
      toast.error(err.message);
      console.log("error", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return {
    callApi,
    error,
    data,
    loading,
  };
}

export default useApi;
