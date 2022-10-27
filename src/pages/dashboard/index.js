import Statistics from "./Statistics";

import { useState, useEffect } from "react";
import { totalRecords } from "../../helpers/auth";
import { useDispatch } from "react-redux";
import { SERVER_BASE_URL } from "../../common/constants";
import SplashScreen from "../../modules/layouts/SplashScreen";
const Dashboard = () => {
  const [total, setTotal] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch;
  useEffect(() => {
    setIsLoading(true);
    handleMe();
    // dispatch(GET_USER_DATA());
  }, []);
  const handleMe = async () => {
    setIsLoading(true);
    try {
      await totalRecords().then((data) => {
        setTotal(data);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
    }
  };
  const statistics = [
    {
      text: "Trainers",
      sum: total?.users?.trainer,
      icon: "iconly-boldProfile",
      icon_color: "blue",
      url: "/",
    },
    {
      text: "Trainees",
      sum: total?.users?.trainee,
      icon: "iconly-boldProfile",
      icon_color: "green",
      url: "/",
    },
    {
      text: "Booked",
      sum: total?.sessions?.booked,
      icon: "iconly-boldWork",
      icon_color: "purple",
      url: "/",
    },
    {
      text: "Total",
      sum: total?.sessions?.total,
      icon: "iconly-boldCategory",
      icon_color: "red",
      url: "/",
    },
  ];

  return (
    <>
      {isLoading === true ? (
        <SplashScreen />
      ) : (
        <>
          <div className="page-heading">
            <h3>Fits Admin</h3>
          </div>
          <div className="page-content">
            <div className="row">
              {statistics.map((stat, i) => {
                return (
                  <div className="col-6 col-lg-3 col-md-6" key={i}>
                    <Statistics stat={stat} />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
