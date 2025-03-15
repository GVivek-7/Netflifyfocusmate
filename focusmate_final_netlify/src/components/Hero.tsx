import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, MessageSquare, Check, Zap, GraduationCap, Globe, Clock } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Find Your Perfect</span>
              <span className="block text-indigo-600">Study Partner</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Connect with students who share your academic interests. Boost your learning through collaborative study sessions.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  to="/profile"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Why Choose StudyBuddy?</h2>
            <p className="mt-4 text-lg text-gray-500">Everything you need to excel in your studies</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                      <Users className="h-6 w-6 text-white" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Smart Matching</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Our advanced algorithm pairs you with study partners who share your academic interests and goals.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                      <Clock className="h-6 w-6 text-white" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Flexible Scheduling</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Study when it works best for you. Coordinate with partners across different time zones.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Real-time Chat</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Communicate seamlessly with your study partners through our integrated chat system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">About Us</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We're on a mission to transform the way students learn and collaborate.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="text-lg font-medium text-gray-900">Our Mission</div>
                <p className="mt-2 text-base text-gray-500">
                  To create a global community of learners who support and inspire each other to achieve academic excellence.
                </p>
              </div>

              <div className="relative">
                <div className="text-lg font-medium text-gray-900">Our Vision</div>
                <p className="mt-2 text-base text-gray-500">
                  To be the world's leading platform for peer-to-peer academic collaboration and support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center">
                <GraduationCap className="h-8 w-8 text-indigo-400" />
                <span className="ml-2 text-xl font-bold text-white">StudyBuddy</span>
              </div>
              <p className="mt-2 text-base text-gray-400">
                Connecting students worldwide for better learning outcomes.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Quick Links</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/profile" className="text-base text-gray-300 hover:text-white">
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link to="/matches" className="text-base text-gray-300 hover:text-white">
                    Find Partners
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contact</h3>
              <ul className="mt-4 space-y-4">
                <li className="flex items-center text-gray-300">
                  <Globe className="h-5 w-5 mr-2 text-indigo-400" />
                  support@studybuddy.com
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 text-center">
              © {new Date().getFullYear()} StudyBuddy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Hero;