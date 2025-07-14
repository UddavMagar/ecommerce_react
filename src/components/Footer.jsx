import React, { Component } from 'react';
import { Globe, Linkedin, Github } from 'lucide-react';
import { withRouter } from '../utils/withRouter'; 

class Footer extends Component {
  render() {
    return (
      <footer className="bg-gray-900 text-white px-6 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Portfolio Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2">About the Developer</h3>
            <p>
              Created by <a href="https://your-portfolio.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Er. Uddav Bahadur Pulami Magar</a>
            </p>
            <p className="text-sm text-gray-400">Computer Engineer</p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact</h3>

            <p>Email: <button className="text-blue-500 hover:underline">uddav.magar73@gmail.com</button></p>
            
            <p>Location: Dhapakhel-24, Laltipur</p>
                              <div className="flex space-x-6 pt-4">
          <a href="https://uddav.xyz/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
            <Globe className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/uddavmagar/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="https://github.com/UddavMagar" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
            <Github className="w-6 h-6" />
          </a>
        </div>
          </div>



          {/* GitHub & Project Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Project Links</h3>
            <a
              href="https://github.com/UddavMagar/ecommerce_react.git"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-400 hover:underline"
            >
              <Github size={20} />
              View on GitHub
            </a>
            <p className="text-sm mt-2 text-gray-400">Open source project</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
          <p>⚠️ This website is for <span className="text-white font-medium">educational purposes</span> only. No real orders or payments are processed.</p>
          <p className="mt-2">© {new Date().getFullYear()} Built by Uddav Bahadur Pulami Magar</p>
        </div>
      </footer>
    );
  }
}

export default withRouter(Footer);
