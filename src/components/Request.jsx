import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Request = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });

      dispatch(addRequest(res.data.data));
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) {
    return;
  }

  if (requests.length === 0) {
    return <h1 className="text-bold text-2xl">NO request found</h1>;
  }

  return (
    <div className="text-center justify-center my-10">
      <h1 className="text-bold tect-white text-3xl">Requests</h1>

      {requests.map((request) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          request;

        return (
          <div
            key={requests._id}
            className=" flex p-4  rounded-lg bg-base-300 w-3/7 m-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-5 my-2">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + " " + gender}</p>}

              <p>{about}</p>
            </div>
            <div>
              <button className="btn btn-primary mx-6 my-4">Accept</button>
              <button className="btn btn-secondary mx-3 ">Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
