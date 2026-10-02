import React, { useState } from "react";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName ?? "");
  const [lastName, setLastName] = useState(user.lastName ?? "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl ?? "");
  const [about, setAbout] = useState(user.about ?? "");
  const [gender, setGender] = useState(user.gender ?? "");
  const [age, setAge] = useState(user.age ?? "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    //before sacing clear error
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          about,
          age,
          gender,
          photoUrl,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res.data?.data));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);

    } catch (err) {
      // setError(err.message);
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    }
  };

  // console.log("lakhay se ");
  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10 ">
          <div className="card bg-base-300 w-96 shadow-sm ">
            <div className="card-body ">
              <h2 className="card-title flex justify-center ">Edit Profile</h2>
              <div className="my-5 ">
                <div>FirstName : </div>
                <input
                  type="text"
                  value={firstName}
                  placeholder="Enter firstName"
                  className="w-full px-5 py-3  border-2 border-blue-100 focus:outline:none rounded-2xl"
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <br />
                <br />

                <div>LastName : </div>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Enter lastName"
                  className="px-5 py-3 w-full border-2 border-blue-100 focus:outline:none
              rounded-2xl"
                  onChange={(e) => setLastName(e.target.value)}
                />

                <br />
                <br />

                <div>PhotoURL : </div>
                <input
                  type="text"
                  value={photoUrl}
                  placeholder="Enter PhotoUrl"
                  className="w-full px-5 py-3  border-2 border-blue-100 focus:outline:none rounded-2xl"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />

                <br />
                <br />

                <div>Age : </div>
                <input
                  type="text"
                  value={age}
                  placeholder="Enter age"
                  className="px-5 py-3 w-full border-2 border-blue-100 focus:outline:none
              rounded-2xl"
                  onChange={(e) => setAge(e.target.value)}
                />

                <br />
                <br />

                <div>About : </div>
                <input
                  type="text"
                  value={about}
                  placeholder="Enter about"
                  className="px-5 py-3 w-full border-2 border-blue-100 focus:outline:none
              rounded-2xl"
                  onChange={(e) => setAbout(e.target.value)}
                />

                <br />
                <br />

                <div>Gender : </div>
                <input
                  type="text"
                  value={gender}
                  placeholder="Enter gender"
                  className="px-5 py-3 w-full border-2 border-blue-100 focus:outline:none
              rounded-2xl"
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary " onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, about, gender, photoUrl }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile was save successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
