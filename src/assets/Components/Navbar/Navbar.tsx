import { useEffect, useState } from "react";
import { HiBars3BottomRight } from "react-icons/hi2";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [show, setShow] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`bg-main z-50 text-white fixed w-full top-0 left-0 duration-500 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div className="container flex justify-between uppercase items-center font-bold flex-wrap">
          <h1 onClick={() => setShow(false)} className="sm:text-3xl text-2xl">
            <Link to="/">Daldart</Link>
          </h1>
          <div
            onClick={() => {
              setShow(!show);
            }}
            className="px-3 py-1 border rounded-md cursor-pointer md:hidden "
          >
            <HiBars3BottomRight className="text-2xl" />
          </div>
          <ul
            id="links"
            className={`list-none text-lg  md:flex flex-col basis-full md:flex-row md:basis-auto ${
              show ? "flex" : "hidden"
            }`}
          >
            <li onClick={() => setShow(false)} className="md:p-2 my-4 md:my-0">
              <NavLink className="p-2" to="/">
                Hot
              </NavLink>
            </li>
            <li onClick={() => setShow(false)} className="md:p-2 my-4 md:my-0">
              <NavLink className="p-2" to="new">
                New
              </NavLink>
            </li>
            <li onClick={() => setShow(false)} className="md:p-2 my-4 md:my-0">
              <NavLink className="p-2" to="rising">
                Rising
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
