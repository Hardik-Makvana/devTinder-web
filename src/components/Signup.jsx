import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      console.log(res);
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    }
  };
  return (
    <div className="flex justify-center my-10 ">
      <div className="card bg-base-300 w-96 shadow-sm ">
        <div className="card-body ">
          <h2 className="card-title flex justify-center ">Signup</h2>
          <div className="my-5 ">
            <input
              type="text"
              value={firstName}
              placeholder="Enter FirstName"
              className="w-full px-5 py-3  border-2 border-blue-100 focus:outline:none rounded-2xl"
              onChange={(e) => setFirstName(e.target.value)}
            />

            <br />
            <br />

            <input
              type="text"
              value={lastName}
              placeholder="Enter LastName"
              className="px-5 py-3 w-full border-2 border-blue-100 focus:outline:none
              rounded-2xl"
              onChange={(e) => setLastName(e.target.value)}
            />

            <br />
            <br />

            <input
              type="text"
              value={email}
              placeholder="Enter email"
              className="px-5 py-3 w-full border-2 border-blue-100 focus:outline:none
              rounded-2xl"
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

          <div className="flex flex-col gap-4">
            <button
              className="btn btn-primary w-full rounded-xl text-base shadow-md hover:scale-[1.02] transition-transform"
              onClick={handleSignUp}
            >
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
