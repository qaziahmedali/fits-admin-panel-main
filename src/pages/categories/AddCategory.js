import { SERVER_BASE_URL } from "../../common/constants";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { fetchApiCloudinary, fetchDataWithBody } from "../../helpers/FetchApi";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const onSubmit = async (data) => {
    setLoading(true);
    const image = data.image[0];
    const img_url = await fetchApiCloudinary(image, "categories");
    const body = {
      name: data.category,
      image: img_url,
    };
    const url = `${SERVER_BASE_URL}api/category/add`;
    const response = await fetchDataWithBody(url, body);
    if (response.success === true) {
      setLoading(false);
      toast.success(response.message, {
        autoClose: 2000,
      });
      navigate("/categories/view");
    } else {
      setLoading(false);
      toast.error(response.message, {
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <h4>Add Category</h4>
      <form className="row mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-md-6 form-group">
          <label>
            Category Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Category Name"
            {...register("category", { required: true })}
          />
          {errors.category ? (
            <p className="validation-error">Category is required</p>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-6 form-group">
          <label>
            Image <span className="text-danger">*</span>
          </label>
          <input
            className="form-control mt-2"
            type="file"
            accept=".jpg, .png"
            {...register("image", {
              required: true,
              onChange: handleImageUpload,
            })}
          />
          {errors.image ? (
            <p className="validation-error">Image is required</p>
          ) : (
            ""
          )}
        </div>
        <div className="col-12 my-3">
          {image ? <img src={image} alt="Category" width="100%" /> : ""}
        </div>
        <div className="col-sm-12 d-flex justify-content-end">
          {loading === true ? (
            <button
              type="submit"
              className="btn btn-primary me-1 mb-1 theme-btn"
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
              className="btn btn-primary me-1 mb-1 theme-btn"
            >
              Add
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default AddCategory;
