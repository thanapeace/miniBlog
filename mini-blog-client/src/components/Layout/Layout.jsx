import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

function Layout() {
  return (
    <>
      <Header/>
      <div className="max-w-3xl mx-auto mt-16 px-4 pb-5 sm:px-6 xl:max-w-5xl xl:px-0">
      <Outlet />
      </div>
    </>
  )
}

export default Layout