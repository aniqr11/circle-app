import LandingPage from "./pages/landing_page";
import LoginPage from "./pages/login_page";
import { Routes, Route, useNavigate } from "react-router-dom";
import RegisterPage from "./pages/register";
import { API, SetAuthToken } from "./libs/api";
import { useDispatch } from "react-redux";
import { AUTH_CHECK, AUTH_ERROR } from "./stores/slices/authSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../src/stores/types/rootState";
import { Navigate, Outlet } from "react-router-dom";
import DetailPage from "./pages/detail_page";
import { PrivateLogin } from "../utils/private_route";
import SearchPage from "./pages/search_page";
import List_follow from "./pages/list_follow";
import Profile from "./pages/profile";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path='/login' element={<LoginPage/>}/> */}
        <Route path="*" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* <Route element={<PrivateLogin />}> */}
        <Route path="/home" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/follows" element={<List_follow />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/detail-page/:id" element={<DetailPage />} />

        {/* </Route> */}
      </Routes>
    </>
  );
}

export default App;
