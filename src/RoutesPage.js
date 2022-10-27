import { lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SplashScreen from "./modules/layouts/SplashScreen";
import { Suspense } from "react";
import Layout from "./modules/Layout";
import { useDispatch, useSelector } from "react-redux";
import { isAuthStatus, isMeAuth } from "./reducers/authSlice";
import { me } from "./helpers/auth";

const ErrorPage404 = lazy(() => import("./modules/errors/ErrorPage404"));
const Login = lazy(() => import("./modules/auth/Login"));
const ForgotPassword = lazy(() => import("./modules/auth/ForgotPassword"));
const VerifyOtp = lazy(() => import("./modules/auth/VerifyOtp"));
const ResetPassword = lazy(() => import("./modules/auth/ResetPassword"));
const Profile = lazy(() => import("./modules/auth/Profile"));
const ChangePassword = lazy(() => import("./modules/auth/ChangePassword"));

const Dashboard = lazy(() => import("./pages/dashboard"));
const ViewCategories = lazy(() => import("./pages/categories/ViewCategories"));
const AddCategory = lazy(() => import("./pages/categories/AddCategory"));
const EditCategory = lazy(() => import("./pages/categories/EditCategory"));

export default function RoutesPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isAuthFlag, setIsAuthFlag] = useState(false);
  const isAuth = useSelector(isAuthStatus);

  useEffect(() => {
    setLoading(true);
    try {
      me().then((response) => {
        setIsAuthFlag(true);
        if (response?.success === true) {
          const user = response;
          dispatch(isMeAuth({ user }));
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    } catch (error) {
      setLoading(false);
    }
  }, []);

  if (loading === true || isAuthFlag === false) {
    return <SplashScreen />;
  } else {
    return (
      <Suspense fallback={<SplashScreen />}>
        <Routes>
          <Route
            path="/"
            element={isAuth ? <Layout /> : <Navigate to="/login" />}
          >
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="categories/view" element={<ViewCategories />} />
            <Route path="category/add" element={<AddCategory />} />
            <Route path="category/edit/:id" element={<EditCategory />} />
          </Route>
          <Route
            path="/login"
            element={!isAuth ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/forgot-password"
            element={!isAuth ? <ForgotPassword /> : <Navigate to="/" />}
          />
          <Route
            path="/verify-otp/:id"
            element={!isAuth ? <VerifyOtp /> : <Navigate to="/" />}
          />
          <Route
            path="/reset-password/:id"
            element={!isAuth ? <ResetPassword /> : <Navigate to="/" />}
          />
          <Route path="*" element={<ErrorPage404 />} />
        </Routes>
      </Suspense>
    );
  }
}
