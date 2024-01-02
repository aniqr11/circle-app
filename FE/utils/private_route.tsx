import { useSelector } from "react-redux";
import { RootState } from "../src/stores/types/rootState";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { API, SetAuthToken } from "../src/libs/api";
import { AUTH_CHECK, AUTH_ERROR } from "../src/stores/slices/authSlice";
import { useDispatch } from "react-redux";

export const PrivateLogin = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function userCheck() {
    try {
      SetAuthToken(localStorage.token);
      const res = await API.get("/check");
      dispatch(AUTH_CHECK(res.data));
    } catch (error) {
      console.log(error);
      dispatch(AUTH_ERROR());
      navigate("/auth/login");
    }
  }

  useEffect(() => {
    userCheck();
  }, []);

  if (auth.username) {
    return <Outlet />;
  }
};
