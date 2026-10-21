import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { addUser, removeUser } from "../utils/userSlice";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[Loading , setLoading] = useState(true);
  
  const userData = useSelector((store) => store.user);

  const getUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
      dispatch(removeUser());

      if (err.response?.status === 401) {
        navigate("/login", { replace: true });
      } else {
        console.error("Failed to fetch user:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [dispatch, navigate]);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
