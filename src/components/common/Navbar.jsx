import React, { useEffect, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/ApniPathShala.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { MdMenu } from "react-icons/md";

import { IoClose } from "react-icons/io5";
// const sublinks = [
//   {
//     title: "python",
//     link:"catalog/python"
//   },
//   {
//     title: "web dev",
//     link:"catalog/webdev"
//   }
// ]

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  // console.log("printing" , subLinks);

  const fetchSublinks = async () => {
    setLoading(true);
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      // console.log("Printing sublink result: " , result );
      setSubLinks(result.data.data);
    } catch (error) {
      console.log("could not fetch the catalog list", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  // console.log( "location pathnae:" , location.pathname);

  const matchRoute = (route) => {
    // console.log( "match route" , route);
    return matchPath({ path: route }, location.pathname);
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className=" relative flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className=" w-11/12 flex max-w-maxContent items-center justify-between">
        {/* image */}

        <Link to="/">
          <img src={logo} width={200} height={50} className="" />
        </Link>

        {/* mobile view  */}

        <div className="md:hidden text-white ">
          <div onClick={toggleMobileMenu}>
            {!isMobileMenuOpen && <MdMenu size={40} />}
          </div>

          {isMobileMenuOpen && (
            <div className="fixed flex rounded-md top-4 left-0 right-0 w-11/12 mx-auto   justify-between  bg-richblack-700 z-[1000]">
              <div className="flex">
                <nav>
                  <ul className="flex flex-col gap-y-6 p-5  text-richblack-25">
                    {/* () -- no need to write  return  */}
                    {NavbarLinks.map((link, index) => {
                      return (
                        <li key={index}>
                          {link.title === "Catalog" ? (
                            <div className="relative flex items-center gap-1 group">
                              <p>{link.title}</p>
                              <IoIosArrowDropdownCircle />

                              <div
                                className="z-10 invisible absolute left-[50%] 
                      translate-x-[-50%] translate-y-[20%] top-[-110%]
                      flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible
                      group-hover:opacity-100 lg:w-[300px]"
                              >
                                <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5 "></div>

                                {subLinks.length ? (
                                  subLinks.map((sublink, index) => (
                                    <Link
                                      to={`/catalog/${sublink.name
                                        .split(" ")
                                        .join("-")
                                        .toLowerCase()}`}
                                      key={index}
                                      className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                    >
                                      <p>{sublink.name}</p>
                                    </Link>
                                  ))
                                ) : (
                                  <div></div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <Link to={link?.path}>
                              <p
                                className={` ${
                                  matchRoute(link?.path)
                                    ? "text-yellow-25  "
                                    : "text-richblack-25"
                                }  `}
                              >
                                {link.title}
                              </p>
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>

              <div className="flex gap-4 h-fit p-5">
                {user && user?.accountType !== "Instructor" && (
                  <Link
                    to="/dashboard/cart"
                    className="relative flex items-center justify-center"
                  >
                    <FaShoppingCart className="text-white" size={30} />
                    {totalItems > 0 && (
                      <span className="text-yellow-5 text-3xl font-bold ">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                )}
                {token === null && (
                  <Link to="/login">
                    <button className="border  rounded-md text-yellow-5 border-richblack-700 bg-richblack-800 px-[12px] py-[8px]   ">
                      Log In
                    </button>
                  </Link>
                )}
                {token === null && (
                  <Link to="/signup">
                    <button className="border text-yellow-5 rounded-md border-richblack-700 bg-richblack-800 px-[12px] py-[8px] ">
                      Sign Up
                    </button>
                  </Link>
                )}
                {token !== null && <ProfileDropDown />}
              </div>

              <div
                onClick={toggleMobileMenu}
                className="p-5 text-white w-fit h-fit mr-2"
              >
                <IoClose size={40} className="" />
              </div>
            </div>
          )}
        </div>

        {/* Navlinks  */}

        {/* desktop view  */}
        <nav>
          <ul className=" hidden   md:flex gap-x-6 text-richblack-25">
            {/* () -- no need to write  return  */}
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="relative flex items-center gap-1 group">
                      <p>{link.title}</p>
                      <IoIosArrowDropdownCircle />

                      <div
                        className="z-10 invisible absolute left-[50%] 
                      translate-x-[-50%] translate-y-[20%] top-[-110%]
                      flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible
                      group-hover:opacity-100 lg:w-[300px]"
                      >
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5 "></div>

                        {subLinks.length ? (
                          subLinks.map((sublink, index) => (
                            <Link
                              to={`/catalog/${sublink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              key={index}
                              className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                            >
                              <p>{sublink.name}</p>
                            </Link>
                          ))
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={` ${
                          matchRoute(link?.path)
                            ? "text-yellow-25  "
                            : "text-richblack-25"
                        }  `}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* login/signup/dashboard*/}

        <div className="hidden md:flex gap-4 items-center">
          {user && user?.accountType !== "Instructor" && (
            <Link
              to="/dashboard/cart"
              className="relative flex items-center justify-center"
            >
              <FaShoppingCart className="text-white" />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="border text-white border-richblack-700 rounded-md bg-richblack-800 px-[12px] py-[8px]   ">
                Log In
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="border text-white border-richblack-700 rounded-md bg-richblack-800 px-[12px] py-[8px] ">
                Sign Up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
