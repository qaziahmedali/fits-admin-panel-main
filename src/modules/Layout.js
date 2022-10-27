import Sidebar from "./layouts/Sidebar";
import Footer from "./layouts/Footer";
import SidebarBackdrop from "./layouts/SidebarBackdrop";
import Header from "./layouts/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div id="app">
      <SidebarBackdrop />
      <Sidebar />
      <div id="main">
        <Header />
        <div className="page-content mt-4">
          <div className="card">
            <div className="card-body">
              <Outlet />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
