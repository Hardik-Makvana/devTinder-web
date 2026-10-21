import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import RequestSkeleton from "./RequestSkeleton";
// import RequestSkeleton from "./RequestSkeleton";

const Request = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRequest = async () => {
    try {
      setIsLoading(true);

      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });

      dispatch(addRequest(res?.data?.data || []));
      setError(null);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const requestReview = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        },
      );

      dispatch(removeRequest(_id));
      await fetchRequest();
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!Array.isArray(requests)) {
    if (isLoading) {
      return <RequestSkeleton />;
    }

    return null;
  }

  const errorMessage =
    typeof error === "string"
      ? error
      : error?.message || "Something went wrong";

  return (
    <div className="text-center justify-center my-10">
      <h1 className="text-bold text-white text-3xl">Requests</h1>

      {/* Show error message */}
      {error && <p className="text-red-500 text-sm my-3">{errorMessage}</p>}

      {/* Show skeleton while requests are loading */}
      {isLoading && requests.length === 0 && <RequestSkeleton />}

      {/* Show empty message after loading finishes */}
      {!isLoading && !error && requests.length === 0 && (
        <h1 className="text-bold text-2xl">NO request found</h1>
      )}

      {/* Show request cards */}
      {!isLoading &&
        requests.map((request) => {
          const { firstName, lastName, photoUrl, age, gender, about } = request;

          return (
            <div
              key={request._id}
              className="flex p-4 my-5 rounded-lg bg-base-300 w-4/8 m-auto"
            >
              <ul className="list bg-base-100 rounded-box shadow-md">
                <li className="list-row w-185">
                  <div>
                    <img
                      className="size-25 rounded-2xl"
                      src={photoUrl}
                      alt={`${firstName} ${lastName}`}
                    />
                  </div>

                  <div className="text-left">
                    <div className="text-accent">
                      {firstName} {lastName}
                    </div>

                    <div className="font-semibold opacity-60">
                      {age && gender && (
                        <p>
                          Age: {age} Gender: {gender}
                        </p>
                      )}

                      <p className="my-1">{about}</p>
                    </div>
                  </div>

                  <div className="my-3">
                    <button
                      className="btn btn-primary mx-6 my-4"
                      onClick={() => requestReview("accepted", request._id)}
                    >
                      Accept
                    </button>

                    <button
                      className="btn btn-secondary mx-3"
                      onClick={() => requestReview("rejected", request._id)}
                    >
                      Reject
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          );
        })}
    </div>
  );
};

export default Request;

// <div>
//   <img
//     alt="photo"
//     className="w-20 h-20 rounded-full"
//     src={photoUrl}
//   />
// </div>
// <div className="text-left mx-5 my-2">
//   <h2 className="font-bold text-xl">
//     {firstName + " " + lastName}
//   </h2>
//   {age && gender && <p>{age + " " + gender}</p>}

//   <p>{about}</p>
// </div>
{
  /* <div>
  <button
    className="btn btn-primary mx-6 my-4 "
    onClick={() => requestReview("accepted", request._id)}
  >
    Accept
  </button>
  <button
    className="btn btn-secondary mx-3 "
    onClick={() => requestReview("rejected", request._id)}
  >
    Reject
  </button>
</div> */
}
