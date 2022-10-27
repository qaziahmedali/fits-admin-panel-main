import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isMeAuth, userDetail } from "../../reducers/authSlice";
import "./style.scss";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchApiCloudinary, fetchDataWithBody } from "../../helpers/FetchApi";
import { SERVER_BASE_URL } from "../../common/constants";

const Profile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector(userDetail);
  const [image, setImage] = useState(userInfo?.personal_info?.profileImage);
  const inputRef = useRef(null);

  const yupValidation = Yup.object().shape({
    email: Yup.string()
      .required("Email is mendatory")
      .email("Email is invalid"),
    name: Yup.string().required("Name is mendatory"),
  });
  const formOptions = { resolver: yupResolver(yupValidation) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;
  // console.log(userInfo);
  const onClickFileUpload = () => {
    inputRef.current?.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    getBase64(file).then((data) => setImage(data));
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  console.log("object>>>", userInfo?.personal_info?.profileImage);
  const onSubmit = async (data) => {
    setLoading(true);
    const imageFile = inputRef.current.files[0];
    if (imageFile) {
      const img_url = await fetchApiCloudinary(imageFile, "usersimages");
      console.log("image_ulr", img_url);
      if (img_url) {
        data.image = img_url;
      }
    }
    const url = `${SERVER_BASE_URL}api/admin/profile-update`;
    const response = await fetchDataWithBody(url, data);
    // console.log("resoponse", response);
    if (response.success === true) {
      dispatch(isMeAuth({ user: response.data }));
      setLoading(false);
      toast.success(response.message, {
        autoClose: 2000,
      });
    } else {
      setLoading(false);
      toast.error(response.message, {
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    let defaultValues = {};
    defaultValues.name = userInfo?.personal_info?.name;
    defaultValues.email = userInfo?.user?.email;
    reset({ ...defaultValues });
  }, [reset, userInfo.personal_info.name, userInfo.user.email]);

  return (
    <>
      <div className="page-heading">
        <h3>Profile</h3>
      </div>
      <div className="page-content profile">
        <div className="box">
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-sm-5 form-group mb-3">
              <img
                className="profile-img"
                src={
                  image
                    ? image
                    : "https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg"
                }
                alt="Avatar"
              />
              <button
                type="button"
                className="btn theme-btn btn-block mt-3"
                onClick={onClickFileUpload}
              >
                Change
              </button>
              <input
                type="file"
                ref={inputRef}
                className="d-none"
                onChange={handleImageUpload}
              />
            </div>
            <div className="col-sm-7 my-auto">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("name")}
                />
                {errors.name ? (
                  <p className="validation-error">{errors.name?.message}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("email")}
                />
                {errors.email ? (
                  <p className="validation-error">{errors.email?.message}</p>
                ) : (
                  ""
                )}
              </div>
              {loading === true ? (
                <button
                  type="submit"
                  className="btn me-1 mb-1 theme-btn float-end"
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
                  className="btn me-1 mb-1 theme-btn float-end"
                >
                  Update
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
