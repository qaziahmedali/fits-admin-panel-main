import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import Delete from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";
import { useState } from "react";
import { Link } from "react-router-dom";

const DataTablePage = (props) => {
  const [selectedData, setSelectedData] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const handleChange = (state) => {
    setSelectedData(state.selectedRows);
  };

  const actions = (
    <Link to={props.addUrl}>
      <IconButton color="primary">
        <Add />
      </IconButton>
    </Link>
  );

  const contextActions = (deleteHandler) => (
    <IconButton color="secondary" onClick={deleteHandler}>
      <Delete />
    </IconButton>
  );

  const deleteAll = () => {
    setToggleCleared(!toggleCleared);
  };

  return (
    <DataTable
      title={<h3>Categories</h3>}
      columns={props.columns}
      data={props.data}
      defaultSortFieldId={1}
      sortIcon={<SortIcon className="ms-1" />}
      pagination
      highlightOnHover
      selectableRows
      actions={actions}
      contextActions={contextActions(deleteAll)}
      selectableRowsComponent={Checkbox}
      clearSelectedRows={toggleCleared}
      onSelectedRowsChange={handleChange}
    />
  );
};

export default DataTablePage;
