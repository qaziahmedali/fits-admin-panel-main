import { Link } from "react-router-dom";

const Statistics = (props) => {
  return (
    <Link to={props.stat.url} className="card text-decoration-none">
      <div className="card-body px-3 py-4-5">
        <div className="row">
          <div className="col-md-4">
            <div className={`stats-icon ${props.stat.icon_color}`}>
              <i className={props.stat.icon}></i>
            </div>
          </div>
          <div className="col-md-8">
            <h6 className="text-muted font-semibold">{props.stat.text}</h6>
            <h6 className="font-extrabold mb-0">{props.stat.sum}</h6>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Statistics;
