import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("hardikmakvana3012@gmail.com");
  const [password, setPassword] = useState("Hardik@3012");
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
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
