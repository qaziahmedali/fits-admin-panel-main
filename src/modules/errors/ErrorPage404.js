import { Link } from "react-router-dom";

const ErrorPage404 = () => {
  return (
    <div
      className="text-center"
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
      }}
    >
      <img
        src="https://res.cloudinary.com/dcwobtmhv/image/upload/v1663055547/error-404_uccfpj.svg"
        alt="Not Found"
        style={{ width: "90%", maxWidth: "300px" }}
      />
      <h1 className="">NOT FOUND</h1>
      <p className="fs-5 text-gray-600">The page you are looking not found.</p>
      <Link to="/" className="btn theme-btn-outline mt-3">
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage404;
