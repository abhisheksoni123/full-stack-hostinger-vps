import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import { toast } from "sonner";
import brandLogo from "../assets/brand-logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { data, loading, error, callApi } = useApi();
  const [errors, setError] = useState({});

  const validate = () => {
    const newError = {};

    if (!email.trim()) {
      newError.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newError.email = "Invalid email";
    }
    if (!password.trim()) {
      newError.password = "Password is required";
    } else if (password.length < 6) {
      newError.password = "Password must be at least 6 characters";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("came");

    if (!validate()) return;

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
    <div className="flex w-full min-h-screen">
      <div className="w-6/12 bg-[#797764] flex items-center justify-center">
        <img
          src={brandLogo}
          alt="Brand Logo"
          className="w-[14rem] h-[14rem] object-contain"
        />
      </div>
      <div className="min-h-screen bg-white w-6/12 flex flex-col items-center justify-center gap-6">
        <div className="w-96 flex flex-col items-start gap-6">
          <span className="text-black text-2xl font-semibold">
            Please login
          </span>

          <form className="gap-2 flex flex-col w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col items-start gap-1">
              <span className="text-black font-medium text-sm">Email</span>
              <div className="">
                {" "}
                <input
                  className="border w-78 text-gray-800 border-black rounded placeholder:text-sm px-1 focus:outline-none focus:ring-0"
                  placeholder="Please enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  value={email}
                />
                <div className="h-5 text-left">
                  {errors.email && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1 items-start">
              <span className="text-black font-medium text-sm">Password</span>
              <div className="">
                <input
                  className="border w-78 text-gray-800 border-black rounded placeholder:text-sm px-1 focus:outline-none focus:ring-0"
                  placeholder="Please enter password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="h-2 text-left">
                  {errors.password && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-start mt-4">
              <button className="border px-4 py-1 rounded-md text-white font-semibold  bg-orange-600">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
