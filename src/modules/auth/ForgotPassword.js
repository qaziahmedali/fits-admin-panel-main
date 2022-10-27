import "./style.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SERVER_BASE_URL } from "../../common/constants";
import { fetchDataWithBody } from "../../helpers/FetchApi";

const ForgotPassword = () => {
  const yupValidation = Yup.object().shape({
    email: Yup.string()
      .required("Email is mendatory")
      .email("Email is invalid"),
  });
  const formOptions = { resolver: yupResolver(yupValidation) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setLoading(true);

    const url = `${SERVER_BASE_URL}api/admin/forgot-password`;
    fetchDataWithBody(url, data)
      .then((response) => {
        if (response.success === true) {
          setLoading(false);
          toast.success(response.message, {
            autoClose: 2000,
          });
          navigate(`/verify-otp/${response.data.id}`);
        } else {
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
      <h3 className="text-center mb-4">Forgot Password</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group position-relative has-icon-left mb-1">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            {...register("email")}
          />
          <div className="form-control-icon">
            <i className="bi bi-envelope"></i>
          </div>
        </div>
        {errors.email ? (
          <p className="validation-error">{errors.email?.message}</p>
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
            Send
          </button>
        )}
      </form>
      <div className="text-center mt-4 fs-6">
        <p className="text-gray-600">
          Remember your account?
          <Link to="/login" className="app-link ms-2">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
