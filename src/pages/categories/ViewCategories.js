import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SERVER_BASE_URL } from "../../common/constants";
import Datatable from "../../components/datatable";
import { fetchDataWithoutBody } from "../../helpers/FetchApi";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Edit";

const ViewCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const url = `${SERVER_BASE_URL}api/category/all`;
    fetchDataWithoutBody(url, "GET").then((response) => {
      if (response.success === true) {
        const new_data = [];
        response.data.forEach((data) => {
          new_data.push({
            ...data,
            image: (
              <img
                src={data.image}
                alt="category"
                style={{ width: "80px", padding: "8px 0" }}
              />
            ),
          });
        });
        setCategories(new_data);
      }
    });
  }, []);

  const columns = [
    {
      name: <b>Name</b>,
      selector: (row) => row.name,
      sortable: true,
      reorder: true,
    },
    {
      name: <b>Image</b>,
      selector: (row) => row.image,
      sortable: true,
      reorder: true,
      right: true,
    },
    {
      name: <b>Action</b>,
      button: true,
      cell: (row) => (
        <Link to={`/category/edit/${row._id}`}>
          <IconButton color="primary">
            <Add />
          </IconButton>
        </Link>
      ),
    },
  ];

  return (
    <Datatable columns={columns} data={categories} addUrl="/category/add" />
  );
};

export default ViewCategories;
