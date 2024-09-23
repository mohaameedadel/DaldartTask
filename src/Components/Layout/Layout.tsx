import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import ArrowUp from "../ArrowUp/ArrowUp";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="pt-24">
        <Outlet></Outlet>
      </div>
      <ArrowUp />
    </>
  );
}
