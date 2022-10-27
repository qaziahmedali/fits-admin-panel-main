const fetchDataWithoutBody = async (url, method, token) => {
  return fetch(url, {
    method: method,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

const fetchDataWithBody = async (url, body) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

const fetchApiCloudinary = async (image, preset_name) => {
  const formData = new FormData();
  formData.append("upload_preset", preset_name);
  formData.append("file", image);
  return fetch("https://api.cloudinary.com/v1_1/dcwobtmhv/image/upload", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      return data.url;
    })
    .catch((error) => {
      return error;
    });
};

export { fetchDataWithBody, fetchDataWithoutBody, fetchApiCloudinary };
