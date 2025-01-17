import React from "react";
import Logo from "../assets/icon.png";
import IconsOne from "../assets/images/icons/iconset-home-bestinclass-01.png";
import IconsTwo from "../assets/images/icons/iconset-01.png";
import Banner from "../assets/images/home-img.jpg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons";
import Footer from '../components/Footer'
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
        <div>
            <header className="bg-[#074799] text-white py-2">
                    <nav className="flex justify-between items-center w-[92%] mx-auto">
                      {/* <div>
                        <img className="w-16" src={Logo} alt="" />
                      </div> */}
                      <div>
  <a href="/" className="group">
    <img
      className="w-16 transition-transform transform group-hover:scale-110"
      src={Logo}
      alt="Logo"
    />
  </a>
</div>

                      <div className="md:static absolute bg-[#074799] md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5">
                        <ul className="flex md:flex-row flex-col md:items-center md:gap-[2vw] gap-5">
                          <li>
                            <a className="hover:text-[#87acec]" href="#">
                              Home
                            </a>
                          </li>
                          <li>
                            <a className="hover:text-[#87acec]" href="#">
                              Why Mentorink
                            </a>
                          </li>
                          <li>
                            <a className="hover:text-[#87acec]" href="#">
                              Our Solutions
                            </a>
                          </li>
                          <li>
                            <a className="hover:text-[#87acec]" href="#">
                              Success Stories
                            </a>
                          </li>
                          <li>
                            <a className="hover:text-[#87acec]" href="#">
                              Blog
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="flex items-center gap-5">
                      <Link to="/register">
                        <button className="bg-[#344CB7] text-white px-5 py-2 rounded-full hover:bg-[#87acec]">
                          Sign up
                        </button>
                        </Link>
                        <Link to="/registerMentee">
                        <button className="bg-[#344CB7] text-white px-5 py-2 rounded-full hover:bg-[#87acec]">
                          Book Your Demo
                        </button>
                        </Link>
                        <FaBars
                          className="text-3xl cursor-pointer md:hidden"
                          onClick="onToggleMenu(this)"
                        //   icon={faBars}
                        />
                      </div>
                    </nav>
                  </header>
        </div>
        <div className="bg-gray-100  ">
        <div className="container pb-8 sm:pb-0 bg-gray-100 w-[92%] mx-auto">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {/* ------------ text content section start ------------ */}
              <div className="flex flex-col justify-center gap-4pt-12 sm:pt-0 text-start">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                  Empower Your People Through the Power of 2
                </h1>
                <p className="text-sm mt-3">
                  Launch and scale your own mentoring programmes in a smart,
                  effective and efficient way
                </p>
                <div>
                <Link to="/registerMentee">
                <button className="bg-[#344CB7] text-white px-5 py-2 mt-4 rounded-full hover:bg-[#87acec]">
                          Book Your Demo
                        </button>
                        </Link>
                        {/* <Link to="/adminLogin">
                <button className="bg-[#344CB7] text-white px-5 py-2 mt-4 rounded-full hover:bg-[#87acec]">
                          Admin login
                        </button>
                        </Link> */}

                  {/* <button className="bg-[#344CB7] text-white px-5 py-2 mt-4 rounded-full hover:bg-[#87acec]">
                    Book Your Demo
                  </button> */}
                </div>
              </div>
              {/* ------------ text content section end ------------ */}

              {/* ------------ Image section start ------------ */}
              <div>
                <div className="pt-5">
                  <img
                    src={Banner}
                    className="rounded-s-sm w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-125 object-contain mx-auto"
                    alt=""
                  />
                </div>
              </div>
              {/* ------------ Image section end ------------ */}
            </div>
          </div>
        </div>
      </div>
      {/* ================ hero-section end=================== */}
      {/* ================ Card-section Start =================== */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1">
          <div className="text-center mt-10">
            <div className="flex justify-center text-3xl font-bold">
              <h1>Best-in-Class</h1>
              <h1 className="ms-3">Mentoring Programs</h1>
            </div>
            <div className="mt-3 w-[50%] mx-auto">
              <p>
                Mentorink enables organisations to grow their employees
                individually and professionally by stimulating social learning
                through smart mentoring activities
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-11 px-5 md:px-0">
          <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">
            <div className="w-28 mx-auto mt-7">
              <img className="rounded-t-lg" src={IconsOne} alt="" />
            </div>
            <div className="p-5">
              <div>
                <h5 className="mb-2 text-2xl font-medium tracking-tight text-gray-800 dark:text-white">
                  Mentoring That Works
                </h5>
              </div>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Unique insights and learnings from hundreds of thousands of
                mentor-mentee pairs.
              </p>
            </div>
          </div>
          <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">
            <div className="w-28 mx-auto mt-7">
              <img className="rounded-t-lg" src={IconsOne} alt="" />
            </div>
            <div className="p-5">
              <div>
                <h5 className="mb-2 text-2xl font-medium tracking-tight text-gray-800 dark:text-white">
                  Mentoring That Works
                </h5>
              </div>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Unique insights and learnings from hundreds of thousands of
                mentor-mentee pairs.
              </p>
            </div>
          </div>
          <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">
            <div className="w-28 mx-auto mt-7">
              <img className="rounded-t-lg" src={IconsOne} alt="" />
            </div>
            <div className="p-5">
              <div>
                <h5 className="mb-2 text-2xl font-medium tracking-tight text-gray-800 dark:text-white">
                  Mentoring That Works
                </h5>
              </div>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Unique insights and learnings from hundreds of thousands of
                mentor-mentee pairs.
              </p>
            </div>
          </div>
          <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">
            <div className="w-28 mx-auto mt-7">
              <img className="rounded-t-lg" src={IconsOne} alt="" />
            </div>
            <div className="p-5">
              <div>
                <h5 className="mb-2 text-2xl font-medium tracking-tight text-gray-800 dark:text-white">
                  Mentoring That Works
                </h5>
              </div>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Unique insights and learnings from hundreds of thousands of
                mentor-mentee pairs.
              </p>
            </div>
          </div>
          <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">
            <div className="w-28 mx-auto mt-7">
              <img className="rounded-t-lg" src={IconsOne} alt="" />
            </div>
            <div className="p-5">
              <div>
                <h5 className="mb-2 text-2xl font-medium tracking-tight text-gray-800 dark:text-white">
                  Mentoring That Works
                </h5>
              </div>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Unique insights and learnings from hundreds of thousands of
                mentor-mentee pairs.
              </p>
            </div>
          </div>
          <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">
            <div className="w-28 mx-auto mt-7">
              <img className="rounded-t-lg" src={IconsOne} alt="" />
            </div>
            <div className="p-5">
              <div>
                <h5 className="mb-2 text-2xl font-medium tracking-tight text-gray-800 dark:text-white">
                  Mentoring That Works
                </h5>
              </div>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Unique insights and learnings from hundreds of thousands of
                mentor-mentee pairs.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ================ Card-section End =================== */}

      {/* ================ Card-section Start =================== */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1">
          <div className="text-center mt-10">
            <div className="flex justify-center text-3xl font-bold">
              <h1 className="font-bold">Deliver up to 150x ROI by driving</h1>
            </div>
            <div className="mt-1 w-[55%] mx-auto">
              <h1 className="text-3xl text-[#074799] font-bold">
                Meaningful Social Connections in the Workplace
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-7 py-11 px-5 md:px-0">
          <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="w-16 ms-4 mt-7">
              <img className="rounded-t-lg" src={IconsTwo} alt="" />
            </div>
            <div className="p-5">
              <div>
                <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-800 dark:text-white">
                Develop Top Talent & Key Skills
                </h5>
              </div>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Let your people learn from each other by mobilising the expertise that already exist among your workforce – at a fraction of the cost of expensive L&D programs.
              </p>
            </div>
          </div>
          <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="w-16 ms-4 mt-7">
              <img className="rounded-t-lg" src={IconsTwo} alt="" />
            </div>
            <div className="p-5">
              <div>
                <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-800 dark:text-white">
                Develop Top Talent & Key Skills
                </h5>
              </div>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Let your people learn from each other by mobilising the expertise that already exist among your workforce – at a fraction of the cost of expensive L&D programs.
              </p>
            </div>
          </div>
          <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="w-16 ms-4 mt-7">
              <img className="rounded-t-lg" src={IconsTwo} alt="" />
            </div>
            <div className="p-5">
              <div>
                <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-800 dark:text-white">
                Develop Top Talent & Key Skills
                </h5>
              </div>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Let your people learn from each other by mobilising the expertise that already exist among your workforce – at a fraction of the cost of expensive L&D programs.
              </p>
            </div>
          </div>
          <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="w-16 ms-4 mt-7">
              <img className="rounded-t-lg" src={IconsTwo} alt="" />
            </div>
            <div className="p-5">
              <div>
                <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-800 dark:text-white">
                Develop Top Talent & Key Skills
                </h5>
              </div>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Let your people learn from each other by mobilising the expertise that already exist among your workforce – at a fraction of the cost of expensive L&D programs.
              </p>
            </div>
          </div>
          
          
        </div>
      </div>
      {/* ================ Card-section End =================== */}

      <section className="bg-[#074799] text-white py-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8 lg:px-16">
          {/* Text Section */}
          <div className="mb-6 md:mb-0 md:w-2/3 lg:w-3/4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-center md:text-left">
              Realize your organisation’s full potential{" "}
              <br className="hidden sm:block" />
              through smart mentoring activities
            </h2>
          </div>

          {/* Button Section */}
          <div className="md:w-1/3 lg:w-1/4 text-center md:text-right">
            <button className="bg-white text-[#074799] font-semibold py-3 px-6 rounded shadow-md hover:bg-gray-100 transition-all duration-300 w-full md:w-auto">
              Get Started Today
            </button>
          </div>
        </div>
      </section>

      <Footer />

    </div>
  )
}

export default HomePage