import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaShoppingCart } from "react-icons/fa";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { IoIosArrowDropdownCircle } from "react-icons/io";


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
  const location = useLocation();


  const [subLinks, setSubLinks] = useState([]);
  // console.log("printing" , subLinks);

  const fetchSublinks = async () => {
      try {
        const result = await apiConnector("GET", categories.CATEGORIES_API)
        // console.log("Printing sublink result: " , result );
        setSubLinks(result.data.allCategory);
      } catch (error) {
        console.log("could not fetch the catalog list" , error);
      }
    }

  useEffect(() => {

    fetchSublinks();

  } , [])


    // console.log( "location pathnae:" , location.pathname);
    

  const matchRoute = (route) => {
      // console.log( "match route" , route);
        return matchPath({ path: route }, location.pathname);
    }

  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className=" w-11/12 flex max-w-maxContent items-center justify-between">
        {/* image */}

        <Link to="/">
          <img src={logo} width={160} height={42} className="" />
        </Link>

        {/* Navlinks  */}

        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
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
                      translate-x-[-50%] translate-y-[50%] top-[-110%]
                      flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible
                      group-hover:opacity-100 lg:w-[300px]"
                      >
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5 "></div>

                        {subLinks.length? (
                          subLinks.map((sublink, index) => (
                            <Link
                              to={sublink.link}
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

        <div className="flex gap-4 items-center">
          {user && user?.accountType != "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <FaShoppingCart className="text-white" />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="border text-white border-richblack-700 bg-richblack-800 px-[12px] py-[8px]   ">
                Log In
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="border text-white border-richblack-700 bg-richblack-800 px-[12px] py-[8px] ">
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

export default Navbar