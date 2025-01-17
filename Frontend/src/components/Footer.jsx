import React from 'react'

function Footer() {
  return (
    <div>
        <footer className="bg-gray-900 text-gray-300 py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div>
            <h2 className="text-white text-2xl font-bold">MentorInk</h2>
            <p className="mt-4 leading-relaxed">
              The ultimate mentoring software for companies and communities.
              Empower your people through smart mentoring activities!
            </p>
            <div className="flex space-x-4 mt-4">
              {/* Social Media Icons */}
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
            <address className="mt-4 text-sm leading-relaxed">
              <p>MentorInk Limited</p>
              <p>Company No: 11180162</p>
              <p>565 Green Lanes, N8 0RL, London, UK</p>
              <p>Email: hello@mentorink.com</p>
              <p>Phone: +44 203 910 6724</p>
            </address>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Become a Partner
                </a>
              </li>
            </ul>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-white font-semibold">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Product
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Book Your Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Privacy Links */}
          <div>
            <h3 className="text-white font-semibold">Privacy</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Declaration of Consent
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  ROI of Mentoring Software
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Use Cases
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter and Badges */}
        <div className="mt-10 border-t border-gray-700 pt-6">
          <div className="grid grid-cols-1">
            <div className="text-center">
              <p>Made with Love around the globe © 2015 - 2025 Mentorink</p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Footer