import "./style.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SERVER_BASE_URL } from "../../common/constants";
import { fetchDataWithBody } from "../../helpers/FetchApi";

const VerifyOtp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { id } = useParams();

  const onSubmit = (data) => {
    setLoading(true);
    const body = {
      jwt_id: id,
      otp: data.otp,
    };
    const url = `${SERVER_BASE_URL}api/admin/verify-otp`;
    fetchDataWithBody(url, body)
      .then((response) => {
        if (response.success === true) {
          setLoading(false);
          toast.success(response.message, {
            autoClose: 2000,
          });
          navigate(`/reset-password/${id}`);
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

  const handleResendOtp = () => {
    const body = {
      jwt_id: id,
    };
    const url = `${SERVER_BASE_URL}api/admin/resend-otp`;
    fetchDataWithBody(url, body)
      .then((response) => {
        if (response.success === true) {
          toast.success(response.message, {
            autoClose: 2000,
          });
        } else {
          toast.error(response.message, {
            autoClose: 2000,
          });
        }
      })
      .catch((_error) => {
        toast.error("Something went wrong! Category not created.", {
          autoClose: 2000,
        });
      });
  };

  return (
    <div className="auth box">
      <h3 className="text-center mb-4">Verify OTP</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group position-relative has-icon-left mb-1">
          <input
            type="number"
            className="form-control"
            placeholder="Type OTP"
            {...register("otp", { required: true })}
          />
          <div className="form-control-icon">
            <i className="bi bi-123"></i>
          </div>
        </div>
        {errors.otp ? <p className="validation-error">OTP is required</p> : ""}
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
            Verify
          </button>
        )}
      </form>
      <div className="text-center mt-4 fs-6">
        <p className="text-gray-600">
          Doesn't receive OTP?
          <button
            type="button"
            className="app-link ms-1 text-decoration-underline"
            onClick={handleResendOtp}
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
