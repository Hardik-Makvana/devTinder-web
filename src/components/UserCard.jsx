import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { motion } from "motion/react";
import { useState } from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;
  const userId = user?._id;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const [swipeX, setSwipeX] = useState(0);
  const [action, setAction] = useState(null);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 120) {
      setAction("interested");
      setSwipeX(600);
    } else if (info.offset.x < -120) {
      setAction("ignored");
      setSwipeX(-600);
    }
  };

  const handleAnimationComplete = () => {
    if (action) {
      handleSendRequest(action);
    }
  };
  <motion.div
    drag="x"
    dragMomentum={false}
    onDragEnd={handleDragEnd}
    animate={{ x: swipeX, rotate: swipeX / 20 }}
    transition={{ duration: 0.25 }}
    onAnimationComplete={handleAnimationComplete}
    whileDrag={{ scale: 1.04 }}
    style={{ touchAction: "pan-y" }}
    className="your-existing-card-classes"
  >
    {/* Tamaro existing profile card UI */}
  </motion.div>;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={user.photoUrl} alt="UserPhoto" />
      </figure>
      <div className="card-body ">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4 align-middle">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", userId)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", userId)}
          >
            interested
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
