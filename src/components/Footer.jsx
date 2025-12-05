import { Link } from "react-router"
import { BookOpen, Mail, Phone, MapPin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 p-10">
      <div className="container mx-auto px-4 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-green-500" />
              <span className="text-xl font-bold text-white">CourseMaster</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Empowering learners worldwide with practical, industry-focused 
              education designed for real-world success.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-sm text-neutral-400 hover:text-white transition"
              >
                Home
              </Link>

              <Link
                to="/courses"
                className="text-sm text-neutral-400 hover:text-white transition"
              >
                Courses
              </Link>

              <Link
                to="/about"
                className="text-sm text-neutral-400 hover:text-white transition"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="text-sm text-neutral-400 hover:text-white transition"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-white mb-4">Categories</h4>
            <nav className="flex flex-col gap-2">
              {[
                "Web Development",
                "Data Science",
                "Mobile Development",
                "UI/UX Design"
              ].map((cat) => (
                <Link
                  to="#"
                  key={cat}
                  className="text-sm text-neutral-400 hover:text-white transition"
                >
                  {cat}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-neutral-400 text-sm">
                <Mail className="h-4 w-4 text-green-500" />
                <span>support@coursemaster.com</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400 text-sm">
                <Phone className="h-4 w-4 text-green-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400 text-sm">
                <MapPin className="h-4 w-4 text-green-500" />
                <span>123 Learning Street, Education City</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-14 pt-8 border-t border-neutral-700 text-center text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} CourseMaster. All rights reserved.</p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
