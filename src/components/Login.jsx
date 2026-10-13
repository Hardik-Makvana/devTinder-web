import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("hardikmakvana3012@gmail.com");
  const [password, setPassword] = useState("Hardik@3012");
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      console.log(res);
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center my-10 ">
      <div className="card bg-base-300 w-96 shadow-sm ">
        <div className="card-body ">
          <h2 className="card-title flex justify-center ">Login</h2>
          <div className="my-5 ">
            <input
              type="text"
              value={email}
              placeholder="Enter Email"
              className="w-full px-5 py-3  border-2 border-blue-100 focus:outline:none rounded-2xl"
              onChange={(e) => setEmail(e.target.value)}
            />

            <br />
            <br />

            <input
              type="text"
              value={password}
              placeholder="Enter Password"
              className="px-5 py-3 w-full border-2 border-blue-100 focus:outline:none
              rounded-2xl"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="text-red-500">{error}</p>

          <div className="flex flex-col gap-4 mt-4">
            <button
              className="btn btn-primary w-full rounded-xl text-base shadow-md hover:scale-[1.02] transition-transform"
              onClick={handleLogin}
            >
              Login
            </button>

            <div className="flex items-center gap-3">
              <div className="h-px bg-base-content/20 flex-1"></div>
              <span className="text-sm opacity-60">OR</span>
              <div className="h-px bg-base-content/20 flex-1"></div>
            </div>

            <p className="text-center text-sm opacity-70">
              Don't have an account?
            </p>

            <Link
              to="/signup"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl
    border-2 border-primary text-primary font-semibold
    hover:bg-primary hover:text-primary-content
    hover:shadow-lg hover:scale-[1.02]
    transition-all duration-300"
            >
              <span>Create Account</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
