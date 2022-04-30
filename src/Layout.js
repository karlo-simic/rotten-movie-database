import { Outlet } from "react-router-dom";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import ErrorBoundary from "components/ErrorBoundary";
import Sidebar from "components/Sidebar";
import Alert from "components/Alert";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />

      <Sidebar />
      <Alert />
    </>
  );
};

export default Layout;
