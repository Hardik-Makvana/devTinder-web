
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;
  const userId = user?._id;
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendRequest = async (status, userId) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="UserPhoto" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {firstName + " " + lastName}
        </h2>

        {age && gender && <p>{age + " " + gender}</p>}
        <p>{about}</p>

        <div className="card-actions justify-center my-4 align-middle">
          <button
            className={`btn btn-primary transition-opacity ${
              isSubmitting
                ? "opacity-40 cursor-not-allowed"
                : ""
            }`}
            disabled={isSubmitting}
            onClick={() => handleSendRequest("ignored", userId)}
          >
            Ignore
          </button>

          <button
            className={`btn btn-secondary transition-opacity ${
              isSubmitting
                ? "opacity-40 cursor-not-allowed"
                : ""
            }`}
            disabled={isSubmitting}
            onClick={() => handleSendRequest("interested", userId)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
