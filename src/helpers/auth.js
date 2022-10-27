import { SERVER_BASE_URL } from "../common/constants";
import { fetchDataWithBody, fetchDataWithoutBody } from "./FetchApi";

const login = async (body) => {
  const url = `${SERVER_BASE_URL}api/auth/login`;
  return fetchDataWithBody(url, "POST", body);
};

const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", data?.token);
    next();
  }
};

const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("access_token")) {
    return JSON.parse(localStorage.getItem("access_token"));
  } else {
    return false;
  }
};

const me = async () => {
  const url = `${SERVER_BASE_URL}api/user/me/${localStorage.getItem("_id")}`;
  if (localStorage.getItem("access_token")) {
    const res = await fetchDataWithoutBody(
      url,
      "GET",
      localStorage.getItem("access_token")
    );
    return res;
  } else {
    return "unauthorize admin";
  }
};

const totalRecords = async () => {
  const url = `${SERVER_BASE_URL}api/records/total`;
  try {
    const data = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return data.json();
  } catch (error) {
    return error;
  }
};
export { login, authenticate, isAuthenticated, me, totalRecords };
