import React, { useState, useEffect, useRef } from "react";

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import RegistrationForm from '../../pages/register/Register'
import Avatar from "../../assets/icons/avatar.jpg";
import { toast } from "react-toastify";
import { Axios } from "../../config";
import requests from "../../libs/request";
import { FiChevronRight } from "react-icons/fi";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  // const { authUser, removeAuthUser } = useAuthStore();
  const [active, setActive] = useState(false);
  const [openDrop, setOpenDrop] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const { pathname } = useLocation();

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenDrop(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const backgroundChange = () => {
      window.scrollY > 0 ? setActive(true) : setActive(false);
    };
    window.addEventListener("scroll", backgroundChange);
    return () => {
      window.removeEventListener("scroll", backgroundChange);
    };
  }, []);

  const slideRight = () => {
    let slider = document.getElementById("navSlider");
    let maxScrollLeft = slider.scrollWidth - slider.clientWidth; // maximum scroll position
    if (slider.scrollLeft < maxScrollLeft) {
      // check if not at the end
      slider.scrollLeft = slider.scrollLeft + 400;
    } else {
      // if at end, wrap to beginning
      slider.scrollLeft = 0;
    }
  };

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try {
      await Axios.get(requests.logout);
      // removeAuthUser();
      localStorage.setItem("currentUser", null);
      toast.success("Logout Successfully", {
        position: "bottom-right",
        toastId: 1,
        autoClose: 1000,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header
      className={`flex items-center justify-center w-full flex-col text-white fixed top-0 transition-all ease-in-out z-20 ${
        active || pathname !== "/" ? "bg-white !text-darkColor" : ""
      }`}
    >
      <div className="contain">
        <div className="w-full flex items-center justify-between py-4 relative">
          <div className="flex items-center gap-2 h-full justify-between w-[50%] sm:w-fit">
            <span onClick={() => setShowLink(true)} className="lg:hidden mt-1">
              {/* <FaBars size={25} /> */}
            </span>
            <Link
              to="/"
              className="text-4xl select-none font-black tracking-tighter"
            >
              <span className="text-primary">ProService</span>
            </Link>
          </div>
          <nav className="flex items-center justify-end gap-7 font-medium text-base">
            <Link to="/" className="cursor-pointer hidden lg:flex">
              Getting Started
            </Link>
            <div className="cursor-pointer hidden lg:flex">Explore</div>

            <div className="items-center gap-2 cursor-pointer hidden lg:flex">
              FAQ
            </div>

            {!currentUser?.user.isServiceProvider && (
              <p className="cursor-pointer hidden lg:flex">Pro Apply</p>
            )}
            {currentUser ? (
              <>
                {currentUser && (
                  <div
                    className="relative flex flex-col sm:flex-row items-center sm:gap-4 cursor-pointer"
                    onClick={() => setOpenDrop((prev) => !prev)}
                  >
                    <img
                      src={currentUser.user.avatar || Avatar}
                      alt="user_image"
                      className="w-[32px] h-[32px] rounded-[50%] object-cover"
                    />
                    <span>{currentUser?.user.name}</span>
                    <div
                      ref={modalRef}
                      className={`absolute top-12 right-0 p-3 z-10 bg-white border rounded-md text-black flex-col items-start gap-3 w-[200px] font-medium transition-transform duration-300 ${
                        openDrop ? "flex" : "hidden"
                      }`}
                    >
                      {currentUser?.user.isServiceProvider && (
                        <>
                          <NavLink
                            to="/myservices"
                            className="cursor-pointer w-full text-sm text-darkColor"
                          >
                            Services
                          </NavLink>
                          <NavLink
                            to="/add"
                            className="cursor-pointer w-full text-sm text-darkColor"
                          >
                            Add New Service
                          </NavLink>
                        </>
                      )}
                      <NavLink
                        to="/bookings"
                        className="cursor-pointer w-full text-sm text-darkColor"
                      >
                        Bookings
                      </NavLink>
                      <NavLink
                        to="/messages"
                        className="cursor-pointer w-full text-sm text-darkColor"
                      >
                        Messages
                      </NavLink>
                      <div
                        onClick={handleLogout}
                        className="cursor-pointer w-full text-sm text-darkColor"
                      >
                        Logout
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <NavLink to="/login" className="cursor-pointer hidden sm:flex">
                  Sign in
                </NavLink>
                <button
            className={`border py-2 px-5 rounded hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 text-sm font-semibold ${
              active ? "text-primary border-primary" : ""
            }`}
            onClick={() => setShowModal(true)} // Open the modal on button click
          >
            Register
          </button>
              </>
            )}
          </nav>
        </div>
      </div>
      <div
        className={`w-full transition-all duration-300 border-b ${
          active || pathname !== "/" ? "flex" : "hidden"
        }`}
      >
        <hr className="border-black" />
        <div className="contain relative">
          <div
            id={"navSlider"}
            className={`w-full inline-block h-full whitespace-nowrap scroll-smooth lg:flex items-center lg:justify-between py-3 overflow-x-auto gap-5 font-medium scrollbar-hide text-sm relative ${
              active || pathname !== "/" ? "!text-gray-500" : "text-gray-200"
            }`}
          ></div>
          <span
            onClick={slideRight}
            className="absolute z-10 top-3 -right-8 cursor-pointer laptop:hidden"
          >
            <FiChevronRight size={20} />
          </span>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowModal(false)}></div>
          <div className="relative z-10 bg-white p-8">
            <RegistrationForm setShowModal={setShowModal} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
