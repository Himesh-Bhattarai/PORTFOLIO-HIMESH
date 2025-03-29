import { Link } from "react-router-dom"
import { Github, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-zinc-900 dark:bg-zinc-950 border-t border-zinc-800 dark:border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">HCB Portfolio</h3>
            <p className="text-gray-400 mb-4">Creating immersive Website and User experience web applications.</p>
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/home" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-400 hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/experience" className="text-gray-400 hover:text-white transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link to="/resume" className="text-gray-400 hover:text-white transition-colors">
                  Resume
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">OWNER OF NPREVOLUTION</h3>
            <p className="text-gray-400 mb-4">A News Portal Web Application For Revolution in Nepal.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-zinc-800 border border-zinc-700 rounded-l-md px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-primary text-white"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-r-md">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-gray-500">
          <p>© {new Date().getFullYear()} HCB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

