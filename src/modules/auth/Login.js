import "./style.scss";
import { SERVER_BASE_URL } from "../../common/constants";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchDataWithBody } from "../../helpers/FetchApi";
import {
  loginFail,
  loginPending,
  loginSuccess,
} from "../../reducers/authSlice";

const Login = () => {
  const yupValidation = Yup.object().shape({
    email: Yup.string()
      .required("Email is mendatory")
      .email("Email is invalid"),
    password: Yup.string()
      .required("Password is mendatory")
      .min(8, "Password must be at least 8 characters")
      .max(15, "Password must be maximum of 15 characters"),
  });
  const formOptions = { resolver: yupResolver(yupValidation) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    setLoading(true);
    dispatch(loginPending());

    const url = `${SERVER_BASE_URL}api/login`;
    fetchDataWithBody(url, data)
      .then((response) => {
        if (response.message === "success") {
          dispatch(loginSuccess({ response }));
          setLoading(false);
          toast.success(response.message, {
            autoClose: 2000,
          });
        } else {
          const error = response.message;
          dispatch(loginFail({ error }));
          setLoading(false);
          toast.error(response.message, {
            autoClose: 2000,
          });
        }
      })
      .catch((_error) => {
        setLoading(false);
        toast.error("Something went wrong! Category not created.", {
          autoClose: 2000,
        });
      });
  };

  return (
    <div className="auth box">
      <h3 className="text-center mb-3">Login</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group position-relative has-icon-left mb-1">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            {...register("email")}
          />
          <div className="form-control-icon">
            <i className="bi bi-person"></i>
          </div>
        </div>
        {errors.email ? (
          <p className="validation-error">{errors.email?.message}</p>
        ) : (
          ""
        )}
        <div className="form-group position-relative has-icon-left mb-1 mt-4">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            {...register("password")}
          />
          <div className="form-control-icon">
            <i className="bi bi-shield-lock"></i>
          </div>
        </div>
        {errors.password ? (
          <p className="validation-error">{errors.password?.message}</p>
        ) : (
          ""
        )}

        {loading === true ? (
          <button
            type="submit"
            className="btn theme-btn btn-block shadow-lg mt-3"
            disabled="disabled"
          >
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
        ) : (
          <button
            type="submit"
            className="btn theme-btn btn-block shadow-lg mt-3"
          >
            Log in
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
