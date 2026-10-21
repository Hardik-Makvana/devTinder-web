import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addConnection, removeConnection } from "../utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ConnectionsSkeleton from "./ConnectionsSkeleton ";

const Connections = () => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connection);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchConnection = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      console.log("API RESPONSE:", res.data);

      dispatch(addConnection(res.data.data || []));
    } catch (err) {
      setError("Something went wrong");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user?._id) return;

    dispatch(removeConnection());
    fetchConnection();
  }, [user?._id]);

  if (isLoading) {
    return <ConnectionsSkeleton />;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (connections.length === 0) {
    return <h2 className="text-2xl">No connections found</h2>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-3xl m-3">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex p-4 rounded-lg bg-base-300 w-1/2 m-auto"
          >
            <ul className="list bg-base-100 rounded-box shadow-md">
              <li className="list-row w-180">
                <div>
                  <img
                    className="size-20 rounded"
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
                        {age} {gender}
                      </p>
                    )}
                    <p>{about}</p>
                  </div>
                </div>

                <Link to={"/chat/" + _id}>
                  <button className="btn btn-primary my-5">Chat</button>
                </Link>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
