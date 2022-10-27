import { useSelector } from "react-redux";
import { sidebarBackdropStatus } from "../../reducers/sidebarSlice";

const SidebarBackdrop = () => {
  const isShowSidebarBackdrop = useSelector(sidebarBackdropStatus);

  const style = {
    backgroundColor: "rgba(0,0,0,.5)",
    height: "100%",
    left: 0,
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 9,
  };
  if (isShowSidebarBackdrop === true) {
    return <div className="sidebar-backdrop" style={style}></div>;
  } else {
    return <></>;
  }
};

export default SidebarBackdrop;
