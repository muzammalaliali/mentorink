import React from 'react'
import { FaBars } from 'react-icons/fa'

function Navbar() {
  return (
    <div>
              <header className="bg-[#074799] text-white py-2">
        <nav className="flex justify-between items-center w-[92%] mx-auto">
          <div>
            <img className="w-16" src={Logo} alt="" />
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
            <button className="bg-[#344CB7] text-white px-5 py-2 rounded-full hover:bg-[#87acec]">
              Book Your Demo
            </button>
            <FaBars
              className="text-3xl cursor-pointer md:hidden"
              onClick="onToggleMenu(this)"
            //   icon={faBars}
            />
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar