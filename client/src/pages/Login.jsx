import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import { toast } from "sonner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { data, loading, error, callApi } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await callApi("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (data) {
      toast.success("Login successful!");
      navigate("/home");
    }
  };

  return (
    <div className="flex flex-col gap-10 border p-7 w-full rounded-xl">
      <div className="">
        <span className="text-gray-200 text-2xl">Please login</span>
      </div>

      <form
        className="flex flex-col gap-8 items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-4">
          <span className="text-white">Email</span>
          <input
            className="border rounded placeholder:text-sm px-1 text-white focus:outline-none focus:ring-0 focus:border-gray-300"
            placeholder="Please enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <span className="text-white">Password</span>
          <input
            className="border rounded placeholder:text-sm px-1 text-white focus:outline-none focus:ring-0 focus:border-gray-300"
            placeholder="Please enter password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button className="border px-4 py-1 rounded-md text-white font-semibold  bg-orange-600">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
